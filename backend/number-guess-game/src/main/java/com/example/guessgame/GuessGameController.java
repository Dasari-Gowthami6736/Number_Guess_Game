package com.example.guessgame;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "http://127.0.0.1:5500/") // Allow frontend requests
public class GuessGameController {

    @Autowired
    private GuessGameService gameService;

    @PostMapping("/guess")
    public GuessResponse makeGuess(@RequestBody GuessRequest request) {
        return gameService.checkGuess(request.getUserGuess());
    }

    @GetMapping("/newgame")
    public String startNewGame() {
        gameService.startNewGame();
        return "New game started!";
    }
}
