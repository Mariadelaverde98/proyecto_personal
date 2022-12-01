# Proyecto final individual 
<img src="img\logo-sinfondo.png">
<img src="docs\diagrama.png">
<img src="docs\uml.png">
<a href="https://excalidraw.com/#json=aGS3Hyw1kCfCMXlYhpI0j,V7Q4Aq54bKbV_v7IWYJYZw">Excalidraw</a>

## Diseño del back

### Controlador de users

| Tipo de petición | End Point | Descripción   |
| :-------- | :------- | :------------------------- |
| `POST` | `/insertUser` | Inserta un registro en la tabla users de la base de datos |
| `POST` | `/login` | Crea un JWT con el email del usuario que ha hecho el login y lo añade en una cookie con nombre "infoJWT"|
| `GET` | `/logout` | Borra la cookie "infoJWT" |
| `DELETE` | `/deleteUser` | Borra un registro de la tabla users de la base de datos |
| `POST` | `/updatePhotoProfile` | Actualiza la foto de perfil del usuario |

### Controlador de followers

| Tipo de petición | End Point | Descripción   |
| :-------- | :------- | :------------------------- |
| `POST` | `/follow` | Inserta un registro en la tabla followers de la base de datos |
| `POST` | `/unfollow` | Borra un registro de la tabla followers de la base de datos |
| `GET` | `/showFollowers` | Muestra todos los followers del usuario que tiene la sesión iniciada |
| `GET` | `/showFollowing` | Muestra todos los usuarios que sigue el usuario que tiene la sesión iniciada |

### Controlador de publications

| Tipo de petición | End Point | Descripción   |
| :-------- | :------- | :------------------------- |
| `-` | `-` | Descripción |
| `-` | `-` | Descripción |

### Controlador de tags

| Tipo de petición | End Point | Descripción   |
| :-------- | :------- | :------------------------- |
| `-` | `-` | Descripción |
| `-` | `-` | Descripción |
| `-` | `-` | Descripción |
| `-` | `-` | Descripción |
