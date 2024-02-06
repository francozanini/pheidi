import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { CardTitle } from "../../components/Card";
import { Card, Text } from "@gluestack-ui/themed";

export default function StatisticsScreen() {
  return (
    <View style={styles.container}>
      <StatisticsCard
        title="Weekly workouts"
        icon="Icon"
        content="7"
        footer="+2 from last week"
      />
      <StatisticsCard
        title="Distance traveled"
        icon="Icon"
        content="15.2 km"
        footer="+3.5 km from last week"
      />
      <StatisticsCard
        title="Average speed"
        icon="Icon"
        content="5.2 km/h"
        footer="+0.2 km/h from last week"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 20,
    alignItems: "center",
    gap: 20,
    backgroundColor: Colors.light.backgroundOffset,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

function StatisticsCard(props: {
  title: string;
  icon: string;
  content: string;
  footer: string;
}) {
  return (
    <Card size="md" maxHeight={250} width={350} gap={20}>
      <CardTitle icon={props.icon}>{props.title}</CardTitle>
      <View>
        <Text fontSize={16} fontWeight="800">
          {props.content}
        </Text>
        <Text fontSize={12}>{props.footer}</Text>
      </View>
    </Card>
  );
}
