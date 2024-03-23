import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Stack } from 'expo-router';
import StockListItem from '@/components/StockListItem';
import { useQuery, gql } from '@apollo/client';

const query = gql`
  query MyQuery($symbol: String) {
    quotes(symbol: $symbol) {
      value {
        name
        symbol
        percent_change
        close
      }
    }
  }
`

export default function TabOneScreen() {
  //const stocks = Object.values(top5) // array of values

  const { data, loading, error } = useQuery(query, {variables: {symbol: 'AAPL,IBM,MSFT,META,NVDA,TSLA,AMD'}})

  if (loading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch stocks</Text>
  }

  const stocks = data.quotes.map((q) => q.value)

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Stocks'}}/>

      <FlatList
        data={stocks}
        renderItem={({ item }) => <StockListItem stock={item} />}
        contentContainerStyle = {{ gap: 20, padding: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
