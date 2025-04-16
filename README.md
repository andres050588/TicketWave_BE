# TicketWave – Backend

Backend monolitico per la piattaforma **TicketWave**, dove gli utenti rivendono biglietti inutilizzati per eventi come concerti o partite.  
Sviluppato in Node.js con Express, Sequelize e MySQL. Pronto per Docker e Kubernetes.

---

## Tecnologie utilizzate

-   **Node.js + Express** – REST API
-   **Sequelize** – ORM per MySQL
-   **MySQL** – Database relazionale
-   **JWT** – Autenticazione utente 
-   **Cloudinary + Multer** – Upload immagini biglietti (prossimi step)
-   **Nodemon** – Dev mode
-   **Docker/Kubernetes** – Deployment e orchestrazione (prossimi step)

---

## Struttura del progetto

```
backend/
├── src/
│   ├── config/          # Configurazione DB, Cloudinary, ecc.
│   ├── controllers/     # Logica API
│   ├── models/          # Modelli Sequelize
│   ├── routes/          # Endpoints REST
│   └── index.js         # Entry point
├── .env                 # Variabili ambiente (template)
├── .gitignore
└── package.json
```

---

## Variabili ambiente(esempio)

```env
PORT=3001
DB_NAME=YOUR_DATABASE_NAME
DB_USER=YOUR_DB_USERNAME
DB_PASS=YOUR_DB_PASSWORD
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=yourJWTpass
```

---

## Endpoints

| Metodo | Rotta                     | Descrizione                                                    |
| ------ | ------------------------- | -------------------------------------------------------------- |
| GET    | `/api/tickets`            | Elenco biglietti disponibili                                   |
| POST   | `/api/tickets`            | Pubblica un nuovo biglietto (protetto jwt)                     |
| POST   | `/api/register`           | Registrazione utente                                           |
| POST   | `/api/login`              | Login utente (ritorna jwt)                                     |
| GET    | `/api/profile`            | Ritorna info dell’utente loggato                               |
| GET    | `/api/orders`             | Visualizza ordini dell’utente (prossimi passi)                 |
| POST   | `/api/orders`             | Crea un nuovo ordine per un biglietto dispon.                  |
| POST   | `/api/orders/:id/complete`| Conclude il ordine (passa da impegnato a acquistato)           |


---

## Docker (prossimi passi)

Presto disponibile un file `docker-compose.yml` per far partire l'intera app con:

-   API backend Node.js
-   Database MySQL

---

## Roadmap

-   [x] Setup backend con Express
-   [x] Connessione a MySQL via Sequelize
-   [x] Creazione modello Ticket
-   [x] Endpoint GET `/api/tickets`
-   [x] Endpoint POST `/api/tickets`
-   [x] Login & JWT token
-   [ ] Upload immagini (Cloudinary)
-   [ ] Docker + Kubernetes
-   [ ] Migrazione a microservizi

---

sviluppato da [AndreiB](https://github.com/andres050588)
