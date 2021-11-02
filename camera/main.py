import firebase_admin
from firebase_admin import credentials, storage

print("begin\n")

cred = credentials.Certificate('firebase-adminsdk.json')

firebase_admin.initialize_app(
    cred, {'storageBucket': 'aegis-5fd8e.appspot.com'})

fileName = "test_image.jpeg"
bucket = storage.bucket()
blob = bucket.blob(fileName)
blob.upload_from_filename(fileName)

blob.make_public()

print("your file url", blob.public_url)

print("\nend")
