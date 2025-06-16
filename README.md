# TicketWave – Backend

Backend monolitico per la piattaforma **TicketWave**, dove gli utenti rivendono biglietti inutilizzati per eventi come concerti o partite.  
Sviluppato in Node.js con Express, Sequelize e MySQL. Pronto per Docker e Kubernetes.

---

## Tecnologie utilizzate

-   **Node.js + Express** – REST API
-   **Sequelize** – ORM per MySQL
-   **MySQL** – Database relazionale
-   **JWT** – Autenticazione utente
-   **Cors** – Gestione della comunicazione sicura tra BE e FE
-   **Cloudinary + Multer** – Upload immagini biglietti (prossimi step)
-   **Nodemon** – Svilupo in hot-reload
-   **Docker/Kubernetes** – Deployment e orchestrazione (prossimi step)

---

## Struttura del progetto

```
backend/
├── src/
│   ├── config/                    # Configurazioni (DB, Cloudinary, ecc.)
│   ├── controllers/               # Logica dei controller
│   ├── models/                    # Modelli Sequelize
│   ├── routes/                    # Endpoints REST
│   ├── utils/                     # Funzioni di utilità
│   │   └── availableOrderTimer.js # Timer per ordini impegnati
│   └── jobs/                      # Job automatici (cleanup ordini scaduti)
│   └── index.js                   # Punto di ingresso dell'app
├── .env                           # Variabili ambiente (esempio)
├── .gitignore
└── package.json
```

---

## Comandi disponibili

-   **Installazione dipendenze
- npm install

-   **Avvio in sviluppo (con dotenv e hot reload)
- npm run dev

-   **Avvio in produzione
- npm start

---

## Variabili ambiente(esempio)

```env
PORT=3001
MYSQLDATABASE=YOUR_DATABASE_NAME
MYSQLUSER=YOUR_DB_USERNAME
MYSQLPASSWORD=YOUR_DB_PASSWORD
MYSQLHOST=localhost
MYSQLPORT=3306
JWT_SECRET=yourJWTpass
FE_DEV_URL=http://localhost:3000
FE_PROD_URL=https://ticketwave-frontend.vercel.app
```

---

## Endpoints

| Metodo | Rotta                      | Descrizione                                          |
| ------ | -------------------------- | ---------------------------------------------------- |
| GET    | `/api/tickets`             | Elenco biglietti disponibili                         |
| POST   | `/api/tickets`             | Pubblica un nuovo biglietto (protetto jwt)           |
| POST   | `/api/register`            | Registrazione utente                                 |
| POST   | `/api/login`               | Login utente (ritorna jwt)                           |
| GET    | `/api/profile`             | Ritorna info dell’utente loggato                     |
| GET    | `/api/orders`              | Visualizza ordini dell’utente (prossimi passi)       |
| POST   | `/api/orders`              | Crea un nuovo ordine per un biglietto dispon.        |
| POST   | `/api/orders/:id/complete` | Conclude il ordine (passa da impegnato a acquistato) |

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
-   [x] Profilo utente autenticato `/api/profile`
-   [x] Gestione ordini:
    -   [x] Crea ordine `POST /api/orders`
    -   [x] Completa ordine `POST /api/orders/:id/complete`
    -   [x] Lista ordini utente `GET /api/orders
-   [x] Upload immagini (Cloudinary)
-   [ ] Docker + Kubernetes
-   [ ] Migrazione a microservizi

---

sviluppato da [AndreiB](https://github.com/andres050588)
