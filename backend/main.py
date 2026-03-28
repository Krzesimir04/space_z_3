from fastapi import FastAPI, Depends
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from fastapi.middleware.cors import CORSMiddleware
from models import get_db, Message, MessageCreate, VitalSign, VitalSignCreate

app = FastAPI()

origins = [
    "https://localhost:5173",
    "http://localhost:5173",
    "http://172.18.0.4:5173",
    "https://172.18.0.4:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.post("/vitals/")
def add_vitals(vitals: VitalSignCreate, db: Session = Depends(get_db)):
    """Dodaje nowy odczyt parametrów życiowych Krzysia."""
    db_vitals = VitalSign(**vitals.dict())
    db.add(db_vitals)
    db.commit()
    db.refresh(db_vitals)
    return db_vitals

@app.get("/vitals/")
def get_vitals(limit: int = 10, db: Session = Depends(get_db)):
    """Pobiera historię parametrów życiowych (domyślnie 10 ostatnich)."""
    return db.query(VitalSign).order_by(VitalSign.timestamp.desc()).limit(limit).all()

@app.post("/messages/")
def send_message(msg: MessageCreate, db: Session = Depends(get_db)):
    """Wysyła wiadomość do/od Krzysia i zapisuje ją w bazie."""
    db_msg = Message(**msg.dict())
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)
    return db_msg

@app.get("/messages/")
def get_messages(limit: int = 50, db: Session = Depends(get_db)):
    """Pobiera historię komunikacji z Krzysiem."""
    return db.query(Message).order_by(Message.timestamp.asc()).limit(limit).all()