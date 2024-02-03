import { View, Text } from "@/components/Themed";
import { StyleProp, ViewStyle, Platform, StyleSheet } from "react-native";

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={StyleSheet.flatten([
        {
          shadowColor: "black",
          shadowRadius: 8,
          shadowOpacity: 0.05,
          borderWidth: 0.25,
          borderRadius: 8,
          padding: 15,
          margin: 15,
          marginBottom: 0,
          maxHeight: 500,
          flexShrink: 1,
          ...Platform.select({
            android: {
              elevation: 1,
            },
            default: {
              shadowColor: "rgba(0,0,0, .2)",
              shadowOffset: { height: 0, width: 0 },
              shadowOpacity: 1,
              shadowRadius: 1,
            },
          }),
        },
        style,
      ])}
    >
      <View style={{ backgroundColor: "transparent" }}>{children}</View>
    </View>
  );
}

export function CardTitle(props: { icon: string; children: React.ReactNode }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ textTransform: "capitalize" }}>{props.children}</Text>
      <Text>{props.icon}</Text>
    </View>
  );
}
