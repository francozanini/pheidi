import { Button, Pressable, StyleSheet } from "react-native";

import { View } from "@/components/Themed";
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
import haversine from "haversine";

const LOCATION_TRACKING_TASK = "location-tracking";

export default function WorkoutScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const distanceTravelled = useDistanceTravelled();

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
            accuracy: Location.Accuracy.BestForNavigation,
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
      <Center height={100}>
        <Heading size="3xl">{formatTime(elapsedTime)}</Heading>
        <Text style={styles.subtitle}>Time</Text>
      </Center>
      <Divider />
      <Center height={200}>
        <Heading size="5xl">{metersToKM(location.coords.speed!)} km/h</Heading>
        <Text style={styles.subtitle}>Speed</Text>
      </Center>
      <Divider />
      <Center height={100}>
        <Heading size="3xl">{distanceTravelled?.toFixed(2)} km</Heading>
        <Text style={styles.subtitle}>Distance</Text>
      </Center>
      <Center justifyContent="flex-end">
        <Button title="Start" onPress={() => setIsRunning(!isRunning)} />
      </Center>
    </VStack>
  );
}

function useDistanceTravelled() {
  const [currentDistance, setCurrentDistance] = useState(0);
  const [allLocations, setLocations] = useState<Location.LocationObject[]>([]);

  TaskManager.defineTask<{ locations: Location.LocationObject[] }>(
    LOCATION_TRACKING_TASK,
    ({ data, error }) => {
      console.log(data?.locations.length, "locations");

      if (error) {
        console.error(error);
        return currentDistance;
      }
      if (data) {
        const { locations } = data;
        allLocations.push(...locations);
        setLocations([...allLocations]);

        setCurrentDistance(
          (curr) => curr + calculateDistanceTravelled(allLocations)
        );
      }
    }
  );
  return currentDistance;
}

function calculateDistanceTravelled(locations: Location.LocationObject[]) {
  let distance = 0;
  for (let i = 0; i < locations.length - 1; i++) {
    const start = locations[i];
    const end = locations[i + 1];
    distance += haversine(start.coords, end.coords);
  }
  return distance;
}

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
  return (meters / 1000).toFixed(2);
}

const styles = StyleSheet.create({
  subtitle: {
    textTransform: "uppercase",
    fontWeight: "600",
    color: Colors.light.text,
  },
});
