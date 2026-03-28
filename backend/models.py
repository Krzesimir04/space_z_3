from fastapi import FastAPI, Depends
from sqlalchemy import create_engine, Column, Integer, Float, String, DateTime, Text
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from pydantic import BaseModel
from datetime import datetime
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://admin:secretpassword@db:5432/mydatabase")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class VitalSign(Base):
    __tablename__ = "vital_signs"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    energy_level = Column(Integer)
    heart_rate = Column(Integer)
    temperature = Column(Float)
    mood = Column(String)

class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    sender = Column(String)
    content = Column(Text)

Base.metadata.create_all(bind=engine)

class VitalSignCreate(BaseModel):
    energy_level: int
    heart_rate: int
    temperature: float
    mood: str

class MessageCreate(BaseModel):
    sender: str
    content: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()