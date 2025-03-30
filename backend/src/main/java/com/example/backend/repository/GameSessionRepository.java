package com.example.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.backend.model.GameSession;

public interface GameSessionRepository extends MongoRepository<GameSession, String> {
    GameSession findByEmailAndCompletedFalse(String email);
}

