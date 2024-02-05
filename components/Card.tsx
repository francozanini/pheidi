import { View, Text } from "@/components/Themed";
import { Heading } from "@gluestack-ui/themed";
import { StyleProp, ViewStyle, Platform, StyleSheet } from "react-native";

export function CardTitle(props: { icon: string; children: React.ReactNode }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Heading style={{ textTransform: "capitalize" }}>
        {props.children}
      </Heading>
      <Text>{props.icon}</Text>
    </View>
  );
}
