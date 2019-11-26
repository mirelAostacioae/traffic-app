import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';
import getDistance from '../utils/getDistance';
import TextItem from '../components/TextItem';
import IconTraffic from '../components/IconTraffic';
import FilterButton from '../components/FilterButton';
import SorterButton from '../components/SorterButton';
import incidentTypes from '../constants/incidents';
import severities from '../constants/severity';
import colors from '../constants/colors';
import sortIncidents from '../utils/sortIncidents';
const ALL_INCIDENTS = 'all';
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  // static navigationOptions = {
  //   title: 'Incidents',
  // };

  state = {
    incidentsList: [],
    filterValue: ALL_INCIDENTS,
    activeSorter: null
  }

  componentDidMount () {
    this.setState({
      activeSorter: 'time'
    })
    const { screenProps } = this.props;
    const { incidentsData } = screenProps;
    this.setState({incidentsList: incidentsData})
  }

  componentDidUpdate (prevProps) {
    const { screenProps } = this.props;
    const { incidentsData } = screenProps;
    if (screenProps && incidentsData !== prevProps.screenProps.incidentsData) {
      this.setState({incidentsList: incidentsData})
    }
  }

  renderIncidents = ({item}) => {
    const { screenProps } = this.props;
    const { currentLocation } = screenProps;
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Incident', {incident: item})}>
        <View style={{...styles.incidentContainer, backgroundColor: severities[item.severity].bgColor}}>
          <View style={styles.titleIncidentWrap}>
            <View style={{...styles.iconWrap, backgroundColor: severities[item.severity].color }}>
              <IconTraffic
                name={incidentTypes[item.type].icon}
                size={18}
                color={'#fff'}
              />
            </View>
            <TextItem style={styles.titleIncident} weight='medium'>{item.title || incidentTypes[item.type].name}</TextItem> 
          </View>
          <TextItem style={styles.descrIncident}><TextItem style={styles.descrIncidentSubtitle} weight='medium'>Distance:</TextItem> {getDistance(currentLocation, {latitude: item.latitude, longitude: item.longitude})}km</TextItem>
          <TextItem style={styles.descrIncident}><TextItem style={styles.descrIncidentSubtitle} weight='medium'>Last update:</TextItem> {item.registered}</TextItem>
        </View>
      </TouchableOpacity>
      
    )
};


handleFilter = (type) => {
  const { screenProps } = this.props;
  const { incidentsData } = screenProps;
  this.setState({filterValue: type})
  if(type === ALL_INCIDENTS) {
    this.setState({incidentsList: incidentsData})
  } else {
    const incidentsFiltered = incidentsData.filter((incident) => incident.type === type)
    this.setState({incidentsList: incidentsFiltered})
  }
}

handleSorter = (type) => {
  this.setState({activeSorter: type})
}

getNoIncidentTitle = () => {
  const { filterValue } = this.state;
  if(filterValue === ALL_INCIDENTS){
    return <TextItem style={styles.noIncidentsTitle}>There are no incidents in your area!</TextItem>;
  }
  {/* TODO: To be added after adding promotions */}
  // if(filterValue === 15){
  //   return <TextItem style={styles.noIncidentsTitle}>There are no <TextItem weight='medium'>promotions</TextItem> in your area!</TextItem>;
  // }
  return <TextItem style={styles.noIncidentsTitle}>There are no <TextItem weight='medium'>{incidentTypes[filterValue].name.toLowerCase()}</TextItem> incidents in your area!</TextItem>
}

render() {
  const { filterValue, activeSorter, incidentsList } = this.state;
  const { screenProps } = this.props;
  const { getIncidents } = screenProps;
  return (
    <View style={styles.container}>
      <View>
        <ScrollView style={styles.filterWrap} horizontal showsHorizontalScrollIndicator={false}>
          <FilterButton
            handlePress={this.handleFilter}
            type={ALL_INCIDENTS}
            active={filterValue === ALL_INCIDENTS}
            title={'All'}
          />
          {Object.keys(incidentTypes).map(incident => (
            <FilterButton
              key={incident}
              handlePress={this.handleFilter}
              type={incident}
              active={filterValue === incident}
              title={incidentTypes[incident].name}
            />
          ))}
          {/* TODO: To be added after adding promotions */}
          {/* <FilterButton
            handlePress={this.handleFilter}
            type={'promo'}
            active={filterValue === 'promo'}
            title={'Promotions'}
          /> */}
        </ScrollView>
      </View>
      <View style={styles.sorterWrap}>
        <View style={styles.sorterDelimitator}></View>
        <SorterButton
          name={'time'}
          type={'lastUpdate'}
          active={activeSorter}
          handlePress={this.handleSorter}
        />
        <View style={styles.sorterDelimitator}></View>
        <SorterButton
          name={'pin'}
          type={'distance'}
          active={activeSorter}
          handlePress={this.handleSorter}
        />
        <View style={styles.sorterDelimitator}></View>
        <SorterButton
          name={'flame'}
          type={'severity'}
          active={activeSorter}
          handlePress={this.handleSorter}
        />
        <View style={styles.sorterDelimitator}></View>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          refreshing={false}
          style={{width: '100%'}}
          data={incidentsList.sort((a, b) => sortIncidents(a, b, this.state.activeSorter))}
          renderItem={this.renderIncidents}
          keyExtractor={item => item.id}
          onRefresh={() => getIncidents()}
        />
        {incidentsList.length === 0 && this.getNoIncidentTitle()}
      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 18 : 6
  },
  filterWrap: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  sorterWrap: {
    paddingBottom: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sorterDelimitator: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.defaultColor,
    marginHorizontal: 10,
  },
  noIncidentsTitle: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    textAlign: 'center'
  },
  title: {
    fontSize: 24
  },
  titleIncidentWrap: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  titleIncident: {
    flex: 1,
    marginLeft: 5,
    textTransform: 'capitalize',
    fontSize: 14,
    color: '#222'
  },
  descrIncident: {
    paddingLeft: 30,
    color: '#222',
    fontSize: 10
  },
  descrIncidentSubtitle: {
    color: '#222',
    fontSize: 10,
  },
  incidentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#fff'
  },
  iconWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    paddingLeft: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,87,51,1)'
  }
});
