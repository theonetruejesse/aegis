import cv2
import numpy as np
import uuid
import os
import time
import firebase_admin
from firebase_admin import credentials, storage


cred = credentials.Certificate('firebase-adminsdk.json')
firebase_admin.initialize_app(
    cred, {'storageBucket': 'aegis-5fd8e.appspot.com'})
bucket = storage.bucket()


def uploadFootage(fileId, fileName):
    # instantiates and uploads to firebase
    global bucket
    # has bug rn, unable to play recorded vid
    print("begin\n")
    blob = bucket.blob(str(fileId))
    blob.upload_from_filename(fileName)
    blob.make_public()
    print("your file url", blob.public_url)
    print("\nend")


counter = 0
startTimer = 0
recordingCounter = 0


def isProcessing(out, frame, vidId, vidName):
    # checks if enough footage length has been recorded within a set timeframe:
    # if yes, uploads footage onto the cloud
    # if no, deletes the footage (prevents false positive upload spamming)
    global counter
    global startTimer
    global recordingCounter

    # todo -> rn arbitary, based on my machine's framerate, adjust accordingly
    requiredLength = 50

    elapsed = 0

    if (startTimer == 0):
        startTimer = time.time()
        return True
    else:
        elapsed = time.time() - startTimer

        if (elapsed < 5 and counter < requiredLength):
            vidOut = cv2.resize(frame, (640, 480))
            out.write(vidOut)
            counter += 1
            print(counter)
            return True
        elif (counter < requiredLength and elapsed >= 5):
            print("deleted footage")
            out.release()
            os.remove(vidName)
        else:
            print("uploading footage")
            uploadFootage(vidId, vidName)
            # once footage is uploaded, continue to record clips till 5 total clips
            # for saving costs sake + upload spam prevention
            recordingCounter += 1
            print("videos so far: " + str(recordingCounter))

        counter = 0
        startTimer = 0
        return False


def main():
    watch_cascade = cv2.CascadeClassifier('guncascade.xml')
    # Gun detecting haar cascade model from:
    # https://github.com/Saksham00799/opencv-gun-detection/blob/master/classifier/cascade.xml
    cap = cv2.VideoCapture(0)

    if (cap.isOpened() == False):
        print("Unable to read camera feed")
    else:
        frame_width = int(cap.get(3))
        frame_height = int(cap.get(4))

        vidId = uuid.uuid4()
        vidName = 'recorded/' + str(vidId) + ".mp4"

        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        out = cv2.VideoWriter(vidName, fourcc, 20.0,
                              (frame_width, frame_height))

        while True:
            ret, frame = cap.read()
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            watch = watch_cascade.detectMultiScale(gray, 1.3, 5)
            for(x, y, w, h) in watch:
                cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
                # todo -> idk what these two vars do, check
                roi_gray = gray[y:y+h, x:x+w]
                roi_color = frame[y:y+h, x:x+w]

                # video is no longer having frames added to it; got deleted or uploaded
                # reset video cv2 output
                if not isProcessing(out, frame, vidId, vidName):
                    vidId = uuid.uuid4()
                    vidName = 'recorded/' + str(vidId) + ".mp4"
                    out = cv2.VideoWriter(
                        vidName, fourcc, 20.0, (frame_width, frame_height))

            cv2.imshow('frame', frame)
            k = cv2.waitKey(1) & 0xff
            if k == 27:
                break
            if recordingCounter == 5:
                break
    cap.release()
    cv2.destroyAllWindows()


# runs main function, loop for processing ml
print("Footage processing begin")
main()
print("Footage processing paused")
