## Database schema diagram 
Link Diagrams: https://drive.google.com/file/d/1Cn7kGTS40v_m4MT_Md3oJs5P01OMoUjc/view?usp=sharing

## Interface  

## Infrastructure Architecture 
<img width="420" height="494" alt="image" src="https://github.com/user-attachments/assets/071678d1-ec6a-4439-ae7b-23cdda40a73b" />

## Pipelines
- Jenkins
<img width="754" height="365" alt="image" src="https://github.com/user-attachments/assets/492bb2af-8e0f-4aa4-aaa1-8cc496d7c374" />
<img width="758" height="364" alt="image" src="https://github.com/user-attachments/assets/7c147ce1-d570-4a56-a69a-221244abc37d" />

- Gitlab
<img width="975" height="243" alt="image" src="https://github.com/user-attachments/assets/84b25932-7c6d-4948-bb3d-37a32eb5455a" />
<img width="1129" height="547" alt="image" src="https://github.com/user-attachments/assets/4fc3b79d-680a-4de7-92c4-b0a28d4ce780" />
<img width="1128" height="515" alt="image" src="https://github.com/user-attachments/assets/d74ddc09-ad7e-464c-9f85-95c5d3066463" />

- Monitoring
<img width="754" height="365" alt="image" src="https://github.com/user-attachments/assets/4d704735-c8b0-46ea-a34d-43325ad12d9e" />
<img width="754" height="365" alt="image" src="https://github.com/user-attachments/assets/e7f57120-6b77-49e0-a348-d0bffd432c4f" />
<img width="758" height="364" alt="image" src="https://github.com/user-attachments/assets/18aab76b-7c5b-4733-b697-fa504d90e446" />

## Quick Start
To get started, simply pull the images and run them:
```bash
$ docker pull phuocsu1211/carfinderfrontend_v1:latest
$ docker pull phuocsu1211/carfinderbackend_v1:latest
$ docker pull phuocsu1211/carfindermysql_v1:latest
```

Start the containers:
```bash
docker run -d --name carfinder-frontend -p 3000:3000 phuocsu1211/carfinderfrontend_v1:latest
docker run -d --name carfinder-backend -p 3001:3001 phuocsu1211/carfinderbackend_v1:latest
docker run -d --name carfinder-mysql -p 3306:3306 phuocsu1211/carfindermysql_v1:latest
```
