
package com.example.backend.controller;

import com.example.backend.model.GameSession;
import com.example.backend.repository.GameSessionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "http://localhost:5173")  // Allow frontend requests
public class GameController {

    private final GameSessionRepository gameSessionRepository;

    public GameController(GameSessionRepository gameSessionRepository) {
        this.gameSessionRepository = gameSessionRepository;
    }

    private static final Map<String, Integer> LEVELS = Map.of(
            "low", 100,
            "medium", 500,
            "high", 1000
    );

    // Start Game: Accepts email & level, generates target number
    @PostMapping("/start")
    public ResponseEntity<?> startGame(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String level = request.get("level");
        System.out.println(level);

        if (email == null || !email.endsWith("@gmail.com")) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid email! Use a valid @gmail.com address."));
        }
        int maxRange = LEVELS.getOrDefault(level, 100);
        int targetNumber = new Random().nextInt(maxRange) + 1;
        System.out.println(targetNumber);

        // Save game session in MongoDB
        GameSession gameSession = new GameSession();
        gameSession.setEmail(email);
        gameSession.setLevel(level);
        gameSession.setTargetNumber(targetNumber);
        gameSession.setAttempts(0);
        gameSession.setCompleted(false);

        gameSessionRepository.save(gameSession);

        return ResponseEntity.ok(Map.of("message", "Game started!", "targetNumber", targetNumber));
    }

    // Handle User Guess
    @PostMapping("/guess")
    public ResponseEntity<?> checkGuess(@RequestBody Map<String, Object> request) {
        String email = (String) request.get("email");
        int guess = (int) request.get("guess");

        GameSession gameSession = gameSessionRepository.findByEmailAndCompletedFalse(email);
        if (gameSession == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "No active game found!"));
        }

        int targetNumber = gameSession.getTargetNumber();
        int attempts = gameSession.getAttempts() + 1;
        gameSession.setAttempts(attempts);

        if (guess < targetNumber) {
            gameSessionRepository.save(gameSession);
            return ResponseEntity.ok(Map.of("message", "Too low! Try again."));
        } else if (guess > targetNumber) {
            gameSessionRepository.save(gameSession);
            return ResponseEntity.ok(Map.of("message", "Too high! Try again."));
        } else {
            gameSession.setCompleted(true);
            gameSessionRepository.save(gameSession);
            return ResponseEntity.ok(Map.of("message", "Correct! You guessed it in " + attempts + " attempts."));
        }
    }
    @GetMapping("/users")
    public ResponseEntity<List<GameSession>> getAllUsers() {
        List<GameSession> sessions = gameSessionRepository.findAll();
        return ResponseEntity.ok(sessions);
    }
}
