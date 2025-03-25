const API_URL = "http://localhost:8080/api/game";

async function submitGuess() {
    const guessInput = document.getElementById("guessInput").value;
    console.log(guessInput);
    
    if (!guessInput || guessInput < 1 || guessInput > 100) {
        alert("Enter a valid number between 1 and 100");
        return;
    }

    const response = await fetch(`${API_URL}/guess`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userGuess: parseInt(guessInput) })
    });

    const data = await response.json();
    document.getElementById("resultMessage").innerText = data.message;
    document.getElementById("score").innerText = data.score;
}

async function startNewGame() {
    await fetch(`${API_URL}/newgame`);
    document.getElementById("resultMessage").innerText = "New game started!";
    document.getElementById("score").innerText = "0";
}
