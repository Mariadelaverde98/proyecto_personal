# proyecto_personal
<img src="img\logo-sinfondo.png">
<img src="docs\diagrama.png">
<a href="https://excalidraw.com/#json=aGS3Hyw1kCfCMXlYhpI0j,V7Q4Aq54bKbV_v7IWYJYZw">Excalidraw</a>

## Diseño del back

### Controlador de users

| Tipo de petición | End Point | Descripción   |
| :-------- | :------- | :------------------------- |
| `POST` | `/insertUser` | Descripción |
| `POST` | `/login` | Descripción |
| `GET` | `/logout` | Descripción |
| `DELETE` | `/deleteUser` | Borra un registro de la tabla de usuaios de la base de datos |

### Controlador de followers

| Tipo de petición | End Point | Descripción   |
| :-------- | :------- | :------------------------- |
| `POST` | `/follow` | Descripción |
| `POST` | `/unfollow` | Descripción |
| `GET` | `/showFollowers` | Muestra todos los followers del usuario que tiene la sesión iniciada |
| `GET` | `/showFollowing` | Muestra todos los usuarios que sigue el usuario que tiene la sesión iniciada |

### Controlador de publications

| Tipo de petición | End Point | Descripción   |
| :-------- | :------- | :------------------------- |
| `POST` | `/follow` | Descripción |
| `POST` | `/unfollow` | Descripción |
| `GET` | `/showFollowers` | Muestra todos los followers del usuario que tiene la sesión iniciada |
| `GET` | `/showFollowing` | Muestra todos los usuarios que sigue el usuario que tiene la sesión iniciada |

### Controlador de tags

| Tipo de petición | End Point | Descripción   |
| :-------- | :------- | :------------------------- |
| `POST` | `/follow` | Descripción |
| `POST` | `/unfollow` | Descripción |
| `GET` | `/showFollowers` | Muestra todos los followers del usuario que tiene la sesión iniciada |
| `GET` | `/showFollowing` | Muestra todos los usuarios que sigue el usuario que tiene la sesión iniciada |
