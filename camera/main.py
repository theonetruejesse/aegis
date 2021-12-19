import cv2
import numpy as np
import uuid
import os
import time
import firebase_admin
from firebase_admin import credentials, storage

# to run code:
# 1) source venv/bin/activate
# 2) python main.py

# similar to .mp4 or other endings, this is black magic, use with vp80
container = ".webm"

cred = credentials.Certificate('firebase-adminsdk.json')
firebase_admin.initialize_app(
    cred, {'storageBucket': 'aegis-5fd8e.appspot.com'})
bucket = storage.bucket()


def uploadFootage(fileId, fileName):
    # instantiates and uploads to firebase
    global bucket
    print("begin\n")
    blob = bucket.blob(str(fileId) + container)
    blob.upload_from_filename(fileName)
    blob.make_public()
    print("your file url", blob.public_url)
    print("\nend")


# all super subjective, figure out combo
# reorganize variables in general lol
counter = 0
startTimer = 0
recordingCounter = 0
maxWait = 10
requiredFrames = 30


def isProcessing(out, frame, vidId, vidName):
    # checks if enough footage length has been recorded within a set timeframe:
    # if yes, uploads footage onto the cloud
    # if no, deletes the footage (prevents false positive upload spamming)
    global counter
    global startTimer
    global recordingCounter
    global requiredFrames
    global maxWait

    elapsed = 0

    if (startTimer == 0):
        startTimer = time.time()
        return True
    else:
        elapsed = time.time() - startTimer

        if (elapsed < maxWait and counter < requiredFrames):
            out.write(frame)
            counter += 1
            print(counter)
            return True
        elif (counter < requiredFrames and elapsed >= maxWait):
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
    cap = cv2.VideoCapture(0)

    if (cap.isOpened() == False):
        print("Unable to read camera feed")
    else:
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

        # also pretty arbitary
        # rn since its 10 second window for getting 30 frames, 10 fps, vid will be roughly 3 seconds
        fps = 10

        vidId = uuid.uuid4()

        vidName = 'recorded/' + str(vidId) + container

        # fourcc = cv2.VideoWriter_fourcc(*'h264')
        # python3 bug, hexcode for h264
        # fourcc = 0x34363268
        fourcc = cv2.VideoWriter_fourcc(*'vp80')

        out = cv2.VideoWriter(
            vidName, fourcc,  fps, (width, height))

        while True:
            ret, frame = cap.read()
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            watch = watch_cascade.detectMultiScale(gray, 1.3, 5)
            for(x, y, w, h) in watch:
                cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
                # todo -> idk what these two vars do, check
                # roi_gray = gray[y:y+h, x:x+w]
                # roi_color = frame[y:y+h, x:x+w]

                # video is no longer having frames added to it; got deleted or uploaded
                # reset video cv2 output
                if not isProcessing(out, frame, vidId, vidName):
                    vidId = uuid.uuid4()
                    vidName = 'recorded/' + str(vidId) + container
                    out = cv2.VideoWriter(
                        vidName, fourcc,  fps, (width, height))

            cv2.imshow('frame', frame)
            k = cv2.waitKey(1) & 0xff
            if k == 27:
                os.remove(vidName)
                break
            if recordingCounter == 5:
                break
    cap.release()
    cv2.destroyAllWindows()


# runs main function, loop for processing ml
print("Footage processing begin")
main()
print("Footage processing paused")
