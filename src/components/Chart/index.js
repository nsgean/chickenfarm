import * as React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { LineChart as Line } from 'react-native-chart-kit';

function Chart({ title, data, suffix, labels, height = 200, width = Dimensions.get("window").width - 60 }) {
    return (
        <View style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: "white", borderRadius: 10, marginBottom: 10 }}>
            {title}
            {data && data.length > 0
                ? <Line
                    data={{
                        labels,
                        datasets: [{ data }]
                    }}
                    verticalLabelRotation={10}
                    width={width}
                    height={height}
                    yAxisSuffix={suffix}
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundColor: "#e30224",
                        backgroundGradientFrom: "#8a0015",
                        backgroundGradientTo: "#e30224",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#332d27"
                        },
                        propsForLabels: {
                            fontSize: "10"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 10
                    }}
                />
                : <View style={{ height, width }}>
                    <Text>Não existem dados para serem exibidos!</Text>
                </View>
            }
        </View>
    )
}

export default Chart