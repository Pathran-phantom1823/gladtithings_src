import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Color, Routes } from 'common';
import Style from './Style.js';
import { connect } from 'react-redux';
import CardsWithImages from 'src/modules/generic/CardsWithImages';
import CustomizedHeader from 'src/modules/generic/CustomizedHeader';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import Api from 'services/api/index.js';
import { Spinner } from 'components';
import AccountCard from 'src/modules/generic/AccountCard.js';
import Config from 'src/config.js';

const width = Math.round(Dimensions.get('window').width)
const height = Math.round(Dimensions.get('window').height)

const data = [
  {
    id: 0,
    name: 'Theme 1',
    address: 'Cebu, Cebu City, Philippines',
    description: "Receivess email address every time there's a login of the account.",
    date: 'July 23, 2021 5:00 PM',
    amount: 'USD 10.00',
    type: 'Recollection'
  },
  {
    id: 1,
    name: 'Theme 2',
    address: 'Cebu, Cebu City, Philippines',
    description: "Receives email address every time there's a login of the account.",
    date: 'July 23, 2021 5:00 PM',
    amount: 'USD 10.00',
    type: 'Recollection'
  }
]
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: null,
      churches: [],
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      isLoading: false
    }
  }

  componentDidMount() {
    this.retrieveChurches()
  }

  retrieveChurches = () => {
    const { days } = this.state;
    let parameter = {
      sort: { created_at: 'asc' },
      limit: 2,
      offset: 0
    }
    this.setState({ isLoading: true })
    Api.request(Routes.merchantsRetrieve, parameter, response => {
      console.log('[RESPONSE]', response)
      this.setState({ isLoading: false })
      if (response.data.length > 0) {
        let temp = [];
        response.data.map((item, index) => {
          let sched = [];
          if (item.schedule) {
            sched = JSON.parse(item.schedule)
          }
          sched.length > 0 && sched.map((items, inde) => {
            let currentDay = new Date().getDay();
            if (items.title === days[currentDay]) {
              items.schedule.length > 0 && items.schedule.map((i, ind) => {
                let a = i.startTime.split(':')
                let b = i.endTime.split(':')
                let aIsAm = parseInt(a[0]) <= 12 ? 'AM' : 'PM'
                let bIsAm = parseInt(b[0]) <= 12 ? 'AM' : 'PM'
                temp.push({
                  id: item.id,
                  address: item.address,
                  logo: item.logo,
                  name: i.name,
                  date: `${days[currentDay]} ${i.startTime} ${aIsAm} - ${i.endTime} ${bIsAm}`
                })
              })
            }
          })
          this.setState({
            churches: temp
          })
        })
      }
    });
  }

  render() {
    const { theme, user, language } = this.props.state;
    const { churches, isLoading } = this.state;
    console.log('[CHURCHES]', churches)
    return (
      <View style={{
        backgroundColor: Color.containerBackground
      }}>
        {isLoading ? <Spinner mode="overlay" /> : null}
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={{
            marginBottom: height / 2
          }}>
            <CustomizedHeader
              version={2}
              redirect={() => {
                this.props.navigation.navigate('subscriptionStack')
              }}
            />
            <View>
              <AccountCard
                name={'Full Name'}
                address={'Cebu City'}
                profile={Config.BACKEND_URL + churches[0]?.logo}
              />
              <View style={Style.title}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    width: '50%'
                  }}
                >{language.visitedChurches}</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('churchesStack')
                  }}
                  style={Style.right}
                >
                  <FontAwesomeIcon
                    icon={faSearch}
                    size={15}
                    style={{
                      color: theme ? theme.primary : Color.primary,
                      marginTop: 4
                    }}
                  />
                  <Text style={{
                    fontFamily: 'Poppins-SemiBold',
                    marginRight: 5,
                    color: theme ? theme.primary : Color.primary
                  }}>{language.findChurch}</Text>
                </TouchableOpacity>
              </View>
              <CardsWithImages
                version={1}
                button={true}
                data={churches}
                buttonColor={theme ? theme.secondary : Color.secondary}
                buttonTitle={language.subscribe}
                redirect={(index) => { this.props.navigation.navigate('churchProfileStack', { data: index }) }}
                buttonClick={(item) => { this.props.navigation.navigate('depositStack', { type: 'Subscription Donation', data: item }) }}
              />
              {churches?.length > 0 && <View style={Style.title}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    width: '50%'
                  }}
                >{language.upcomingMasses}</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('churchesStack')
                  }}
                  style={Style.right}
                >
                  <Text style={{
                    fontFamily: 'Poppins-SemiBold',
                    color: theme ? theme.primary : Color.primary
                  }}>{language.viewMore + '>>>'}</Text>

                </TouchableOpacity>
              </View>}
              <CardsWithImages
                version={1}
                data={churches}
                buttonColor={theme ? theme.secondary : Color.secondary}
                buttonTitle={language.subscribe}
                redirect={(data) => { this.props.navigation.navigate('churchProfileStack', { data: data }) }}
                buttonClick={(item) => { this.props.navigation.navigate('depositStack', { type: 'Subscription Donation', data: item }) }}
              />
              <View style={Style.title}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    width: '50%'
                  }}
                >{language.upcomingEvents}</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('eventsStack')
                  }}
                  style={Style.right}
                >
                  <Text style={{
                    fontFamily: 'Poppins-SemiBold',
                    color: theme ? theme.primary : Color.primary
                  }}>{language.viewMore + '>>>'}</Text>

                </TouchableOpacity>
              </View>
              <CardsWithImages
                button={true}
                version={1}
                data={data}
                buttonColor={theme ? theme.secondary : Color.secondary}
                buttonTitle={language.donate}
                redirect={() => { return }}
                buttonClick={() => { this.props.navigation.navigate('depositStack', { type: 'Send Event Tithings' }) }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => ({ state: state });

export default connect(
  mapStateToProps
)(HomePage);
