import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [opponentHand, setOpponentHand] = useState(null);
  const [result, setResult] = useState(null);

  const hands = {
    pedra: "✊",
    papel: "🖐️",
    tesoura: "✌️",
  };

  const choices = useMemo(() => Object.keys(hands), []);

  function jankenpon(move) {
    const index = Math.floor(Math.random() * choices.length);
    const opponentChoice = choices.at(index);

    const win1 = move == "pedra" && opponentChoice == "tesoura";
    const win2 = move == "papel" && opponentChoice == "pedra";
    const win3 = move == "tesoura" && opponentChoice == "papel";

    if (move == opponentChoice) {
      setResult("Empate");
    } else if (win1 || win2 || win3) {
      setResult("Vitória");
    } else {
      setResult("Derrota");
    }

    setOpponentHand(hands[opponentChoice]);
  }

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Pedra Papel Tesoura</Text>

          <View style={styles.content}>
            <View>
              <Text style={styles.playerName}>Oponente</Text>
              <Text style={styles.hand}>
                {opponentHand ? opponentHand : "?"}
              </Text>
            </View>

            <Text style={[{ fontSize: 18 }, styles.boldText]}>x</Text>

            <View>
              <Text style={styles.playerName}>Você</Text>
              <View style={styles.handContainer}>
                {choices.map((item) => (
                  <TouchableOpacity key={item} onPress={() => jankenpon(item)}>
                    <Text style={styles.hand}>{hands[item]}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <Text style={styles.resultText}>
            Resultado {result && <Text style={styles.boldText}>{result}</Text>}
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: "20%",
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: "space-around",
    paddingVertical: "40%",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  playerName: {
    fontSize: 20,
  },
  hand: {
    fontSize: 32,
  },
  handContainer: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
  },
  resultText: {
    fontSize: 18,
  },
  boldText: {
    fontWeight: "800",
  },
});
