import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Color, Routes } from 'common';
import { connect } from 'react-redux';
import CardsWithImages from '../generic/CardsWithImages';
import IncrementButton from 'components/Form/Button';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChurch } from '@fortawesome/free-solid-svg-icons';
import CardsWithIcon from '../generic/CardsWithIcon';
import Api from 'services/api/index.js';
import { Spinner } from 'components';

const width = Math.round(Dimensions.get('window').width)
const height = Math.round(Dimensions.get('window').height)

const donations = [
  {
    title: 'July 23, 2021 5:00 PM',
    description: "Change your theme colors here",
    route: null
  },
  {
    title: 'July 23, 2021 5:00 PM',
    description: "Change your theme colors here",
    route: null
  }
]
class ChurchProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: null,
      data: [],
      isLoading: false,
      limit: 4,
      offset: 0
    }
  }

  componentDidMount(){
    this.retrieveEvents(false)
  }

  retrieveEvents = (flag) => {
    const { data } = this.props.navigation.state.params
    const { limit, offset } = this.state;
    let parameter = {
      condition: [{
        value: data?.account_id,
        column: 'account_id',
        clause: '='
      }],
      sort: {created_at: 'asc'},
      limit: limit,
      offset: flag == true && offset > 0 ? (offset * limit) : offset
    }
    this.setState({isLoading: true});
    Api.request(Routes.eventsRetrieve, parameter, response => {
      this.setState({isLoading: false});
      if(response.data.length > 0) {
        response.data.map((item, index) => {
          item['logo'] = item.image?.length > 0 ? item.image[0].category : null
          item['address'] = item.location
          item['date'] = item.start_date
        })
        this.setState({
          data: flag == false ? response.data : _.uniqBy([...this.state.data, ...response.data], 'id'),
          offset: flag == false ? 1 : (this.state.offset + 1)
        })
      } else {
        this.setState({
          data: flag == false ? [] : this.state.data,
          offset: flag == false ? 0 : this.state.offset
        })
      }
    }, error => {
      console.log(error)
      console.log(Routes.eventsRetrieve, parameter, '---')
    })
  }

  render() {
    const { theme, user, language } = this.props.state;
    const { data } = this.props.navigation.state.params
    const { isLoading } = this.state;
    return (
      <View style={{
        backgroundColor: Color.containerBackground,
      }}>
        <ScrollView showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          let scrollingHeight = event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y
          let totalHeight = event.nativeEvent.contentSize.height
          if (event.nativeEvent.contentOffset.y <= 0) {
            if (isLoading == false) {
              // this.retrieve(false)
            }
          }
          if (scrollingHeight >= (totalHeight)) {
            if (isLoading == false) {
              this.retrieveEvents(true)
            }
          }
        }}>
          <View style={{
            height: height * 1.5
          }}>
            <View style={{
              height: height / 3,
              justifyContent: 'center',
              alignItems: 'center',
              width: width,
              backgroundColor: theme ? theme.primary : Color.primary,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              padding: 15,
            }}>
              <FontAwesomeIcon
                icon={faChurch}
                size={height / 6}
                style={{
                  color: 'white'
                }}
              />
              <Text style={{
                color: 'white',
                fontFamily: 'Poppins-SemiBold'
              }}>{data?.name}</Text>
              <Text style={{
                color: 'white',
                fontFamily: 'Poppins-SemiBold'
              }}>{data?.address}</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
              marginBottom: 20
            }}>
              <IncrementButton style={{
                backgroundColor: Color.primary,
                width: '40%',
                marginRight: 20
              }}
                onClick={() => {
                  this.props.navigation.navigate('depositStack', { type: 'Subscription Donation', data: data })
                }}
                title={language.Follow}
              />

              <IncrementButton style={{
                backgroundColor: Color.secondary,
                width: '40%'
              }}
                onClick={() => {
                  this.props.navigation.navigate('depositStack', { type: 'Send Tithings', data: data})
                }}
                title={language.Donation}
              />
            </View>
            <View style={{
              width: width,
              paddingLeft: 15,
              paddingRight: 15
            }}>
              <Text style={{
                fontFamily: 'Poppins-SemiBold'
              }}>Announcements</Text>
              {
                donations.map((item, index) => {
                  return (
                    <CardsWithIcon
                      redirect={() => {
                        return
                      }}
                      version={5}
                      title={item.title}
                      description={item.description}
                    />
                  )
                })
              }
            </View>
            <View>
              <Text style={{
                paddingTop: 10,
                paddingLeft: 20,
                fontFamily: 'Poppins-SemiBold'
              }}>Events</Text>
              <CardsWithImages
                button={true}
                version={1}
                data={this.state.data}
                buttonColor={theme ? theme.secondary : Color.secondary}
                buttonTitle={language.donate}
                redirect={() => { return }}
                buttonClick={() => { this.props.navigation.navigate('depositStack', { type: 'Send Event Tithings' }) }}
              />
            </View>
          </View>
        </ScrollView>
        {isLoading ? <Spinner mode="overlay" /> : null}
      </View>
    );
  }
}
const mapStateToProps = state => ({ state: state });

export default connect(
  mapStateToProps
)(ChurchProfile);
