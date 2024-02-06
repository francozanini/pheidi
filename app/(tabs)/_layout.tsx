import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Button, ButtonIcon, ButtonText } from "@gluestack-ui/themed";
import { ActivityIcon, BarChart3Icon } from "lucide-react-native";
import { Text } from "../../components/Themed";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Statistics",
          tabBarIcon: ({ color }) => <BarChart3Icon color={color} />,
          tabBarLabel: "Statistics",
          headerRight: () => (
            <Button action="primary" size="sm" variant="link" mr={"$4"}>
              <ButtonText>New workout</ButtonText>
            </Button>
          ),
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: "Workout",
          tabBarIcon: ({ color }) => <ActivityIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
