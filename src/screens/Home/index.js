import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BadgeButton } from '../../components/Button';
import Chart from '../../components/Chart';

function HomeScreen({ changeType, type, loading, average, quantity }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 20, }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                <BadgeButton title={"60 minutos"} onPress={() => changeType(1)} active={type === 1} disabled={loading} />
                <BadgeButton title={"6 horas"} onPress={() => changeType(2)} active={type === 2} disabled={loading} />
                <BadgeButton title={"7 dias"} onPress={() => changeType(4)} active={type === 4} disabled={loading} />
                <BadgeButton title={"1 mês"} onPress={() => changeType(5)} active={type === 5} disabled={loading} />
            </View>
            <Chart
                labels={average && average.labels}
                data={average && average.data}
                suffix={"g"}
                title={<Text>Média de alimentação</Text>}
            />
            <Chart
                labels={quantity && quantity.labels}
                data={quantity && quantity.data}
                suffix={"g"}
                title={<Text>Quantidade de alimento despejado</Text>}
            />
        </View>
    );
}

export default HomeScreen;