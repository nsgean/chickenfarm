import React, { useEffect, useState } from 'react';
import HomeScreen from '../../screens/Home';
import moment from 'moment';
import database from '@react-native-firebase/database';
import _ from 'lodash';

function HomeContainer() {
    const [type, setType] = useState(1)
    const [loading, setLoading] = useState(false)
    const [average, setAverage] = useState({})
    const [quantity, setQuantity] = useState({})

    useEffect(() => {
        loadData()
    }, [type])

    const loadData = async () => {
        setLoading(true)
        const { startDate, actualDate } = formatDates(type)

        database()
            .ref('/Average')
            .once('value')
            .then(snapshot => {
                const arr = _.values(snapshot.val());
                const newArray = arr.filter(({ timestamp }) => timestamp >= startDate && timestamp <= actualDate)
                const formattedData = formatData(newArray, type)
                setAverage(formattedData)
            })
            .catch(e => console.log({ e }))
            .finally(() => setLoading(false))

        database()
            .ref('/Quantity')
            .once('value')
            .then(snapshot => {
                const arr = _.values(snapshot.val());
                const newArray = arr.filter(({ timestamp }) => timestamp >= startDate && timestamp <= actualDate)
                const formattedData = formatData(newArray, type, false)
                setQuantity(formattedData)
            })
            .catch(e => console.log({ e }))
            .finally(() => setLoading(false))
    }

    const changeType = (type) => {
        setType(type)
    }

    return (
        <HomeScreen
            changeType={changeType}
            type={type}
            loading={loading}
            average={average}
            quantity={quantity}
        />
    );
}

export default HomeContainer;

const formatData = (array, type, avg = true) => {
    let format;

    switch (type) {
        case 1:
            format = "m"
            break;
        case 2:
            format = "H"
            break;
        case 4:
            format = "D/M"
            break;
        case 5:
            format = "w"
            break;
        default:
            break
    }

    const formattedData = array.map(item => ({ ...item, date: moment(item.timestamp).format(format) }))
    const groupUsers = _.groupBy(formattedData, 'date');
    var correctUsers = []

    if (avg) {
        _.forEach(groupUsers, function (value, key) {
            const sum = _.reduce(value, function (sum, n) { return sum + parseFloat(n.avg) }, 0);
            const gram = (sum / value.length) || 0;
            correctUsers.push({ date: key, gram, timestamp: value[0].timestamp })
        });
    } else {
        _.forEach(groupUsers, function (value, key) {
            const gram = _.reduce(value, function (sum, n) { return sum + parseFloat(n.avg) }, 0);
            correctUsers.push({ date: key, gram, timestamp: value[0].timestamp })
        });
    }

    if (type === 5 && correctUsers.length > 0) {
        correctUsers = correctUsers.map(item => ({ ...item, date: `${moment().weeks(item.date).startOf('week').date()}/${moment().weeks(item.date).startOf('week').month() + 1} - ${moment().weeks(item.date).endOf('week').date()}/${moment().weeks(item.date).endOf('week').month() + 1}` }))
    }

    correctUsers = _.orderBy(correctUsers, 'timestamp', 'asc')
    const data = correctUsers.map(item => item.gram).filter(item => item)
    const labels = correctUsers.map(item => item.date).filter(item => item)

    return { data, labels }
}

const formatDates = (type) => {
    let typeDate;
    let diffDate;

    switch (type) {
        case 1:
            typeDate = "hours"
            diffDate = 1;
            break;
        case 2:
            typeDate = "hours"
            diffDate = 6
            break;
        case 3:
            typeDate = "days"
            diffDate = 1;
            break;
        case 4:
            typeDate = "days"
            diffDate = 7;
            break;
        case 5:
            typeDate = "months"
            diffDate = 1;
            break;
        default:
            break
    }

    const actualDate = moment().valueOf()
    const startDate = moment().subtract(typeDate, diffDate).valueOf()

    return { startDate, actualDate }
}
