import { ActivityIndicator, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useLocalSearchParams, Stack } from "expo-router";
import StockListItem from "@/components/StockListItem";
import Graph from "@/components/Graph";
import { useQuery, gql } from "@apollo/client";

const query = gql`
  query MyQuery($symbol: String) {
    quote(symbol: $symbol) {
      name
      symbol
      close
      percent_change
    }
  }
`;

const StockDetails = () => {
  const { symbol } = useLocalSearchParams();

  const { data, loading, error } = useQuery(query, { variables: { symbol } });

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Stock with symbol {symbol} could not be found</Text>;
  }

  const stock = data.quote;

  return (
    <View style={{ padding: 10 }}>
      <Stack.Screen
        options={{ title: stock.symbol, headerBackTitleVisible: false }}
      />
      <StockListItem stock={stock} />
      <Graph symbol={stock.symbol} />
    </View>
  );
};

export default StockDetails;
