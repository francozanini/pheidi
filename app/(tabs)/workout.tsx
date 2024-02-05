import { Button, Pressable, StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { CardTitle } from "@/components/Card";
import Colors from "@/constants/Colors";
import {
  Box,
  Text,
  Center,
  Divider,
  Heading,
  VStack,
  HStack,
} from "@gluestack-ui/themed";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import * as TaskManager from "expo-task-manager";

const LOCATION_TRACKING_TASK = "location-tracking";

export default function WorkoutScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status: foregroundStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus === "granted") {
        const { status: backgroundStatus } =
          await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus === "granted") {
          await Location.startLocationUpdatesAsync(LOCATION_TRACKING_TASK, {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 1,
          });
        }
      }
    })();
  }, []);

  if (errorMsg) {
    return (
      <View>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <Heading size="3xl" style={{ textAlign: "center" }}>
        Loading...
      </Heading>
    );
  }

  return (
    <VStack space={"md"} h={"$full"} gap={20} top={20}>
      <Center height={120}>
        <Heading size="3xl">{formatTime(elapsedTime)}</Heading>
        <Text style={styles.subtitle}>Time</Text>
      </Center>
      <Divider />
      <Center height={300}>
        <Heading size="5xl">{metersToKM(location.coords.speed!)} km/h</Heading>
        <Text style={styles.subtitle}>Speed</Text>
      </Center>
      <Divider />
      <Center height={120}>
        <Heading size="3xl">3.2 km</Heading>
        <Text style={styles.subtitle}>Distance</Text>
      </Center>
      <Center>
        <Button title="Start" onPress={() => setIsRunning(!isRunning)} />
      </Center>
    </VStack>
  );
}

TaskManager.defineTask<{ locations: Location[] }>(
  LOCATION_TRACKING_TASK,
  ({ data, error }) => {
    if (error) {
      console.error(error);
      return;
    }
    if (data) {
      const { locations } = data;
      console.log("Received new locations", locations);
    }
    console.log("tick");
  }
);

function formatTime(timeInSeconds: number) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedHours = hours < 10 ? `0${hours}` : hours;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function metersToKM(meters: number) {
  return meters / 1000;
}

const styles = StyleSheet.create({
  subtitle: {
    textTransform: "uppercase",
    fontWeight: "600",
    color: Colors.light.text,
  },
});
