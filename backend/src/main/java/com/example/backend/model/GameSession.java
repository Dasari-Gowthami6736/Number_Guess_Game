package com.example.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "game_sessions")  // MongoDB collection name
@Getter
@Setter
public class GameSession {
    @Id
    private String id;
    private String email;
    private String level;
    private int targetNumber;
    private int attempts;
    private boolean completed;

    // No-arg constructor (for Spring Data MongoDB)
    public GameSession() {}

    // Constructor with parameters
    public GameSession(String email, String level, int targetNumber) {
        this.email = email;
        this.level = level;
        this.targetNumber = targetNumber;
        this.attempts = 0;
        this.completed = false;
    }
    // ✅ Add getter methods
    public String getEmail() {
        return email;
    }
    public String getLevel() {
        return level;
    }

    public int getTargetNumber() {
        return targetNumber;
    }

    public int getAttempts() {
        return attempts;
    }

    public boolean isCompleted() {
        return completed;
    }

    // ✅ Add setter methods if needed
    public void setEmail(String email) {
        this.email = email;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public void setTargetNumber(int targetNumber) {
        this.targetNumber = targetNumber;
    }

    public void setAttempts(int attempts) {
        this.attempts = attempts;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
