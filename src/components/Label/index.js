
const TYPES = {
    1: "Última hora",
    2: "Últimas 6 horas",
    3: "Últimas 24 horas",
    4: "Últimos 7 dias",
    5: "Último mês"
}

export const TypeChartLabel = (type) => {
    return TYPES[type]
}