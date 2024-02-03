import { Button, Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Card, CardTitle } from "@/components/Card";
import Colors from "@/constants/Colors";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Card
        style={{
          minWidth: 350,
        }}
      >
        <CardTitle icon={"clock"}>Current workout</CardTitle>
        <View
          style={{
            alignItems: "center",
            gap: 8,
            flex: 1,
          }}
        >
          <Text style={styles.title}>00:00:00</Text>
          <Text style={styles.subtitle}>Time elapsed</Text>
          <Text style={styles.title}>0.0 km</Text>
          <Text style={styles.subtitle}>Distance traveled</Text>
        </View>
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 4 }}
        >
          <Button title="Start" onPress={() => {}} />
          <Button title="Hurry" onPress={() => {}} />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.backgroundOffset,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 10,
    color: "gray",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
