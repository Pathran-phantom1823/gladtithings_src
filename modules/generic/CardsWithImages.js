import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';;
import { Color, BasicStyles } from 'common';
import { Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImage, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import Button from '../generic/Button';
import Styles from './CardsWithImagesStyles';
import Config from 'src/config.js';
import ImageModal from 'components/Modal/ImageModal.js';

const width = Math.round(Dimensions.get('window').width)
const height = Math.round(Dimensions.get('window').height)

class CardsWithImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageModalUrl: null,
      isImageModal: false
    }
  }

  setImage = (url) => {
    this.setState({ imageModalUrl: url })
    setTimeout(() => {
      this.setState({ isImageModal: true })
    }, 500)
  }

  versionTwo = () => {
    const { theme } = this.props.state;
    return (
      <View style={Styles.container}>
        {this.props.data?.length > 0 && this.props.data.map((item, index) => (
          <TouchableOpacity style={{
            height: 200,
            width: '50%',
            padding: 10
          }}
            onPress={() => {
              if (this.props.redirect) {
                this.props.redirect()
              }
            }}
          >
            <View style={{
              height: '75%'
            }}>
              <Image
                source={require('assets/test.jpg')}
                style={Styles.image} />
            </View>
            <Text
              numberOfLines={1}
              style={
                {
                  color: theme ? theme.primary : Color.primary,
                  fontFamily: 'Poppins-SemiBold',
                  width: '85%',
                  marginTop: 7
                }
              }>{item.type}</Text>
            <Text
              numberOfLines={1}
              style={{
                width: '85%'
              }}>{item.date}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  versionOne = () => {
    const { theme } = this.props.state;
    return (
      <View style={Styles.container}>
        {this.props.data?.length > 0 && this.props.data.map((item, index) => (
          <TouchableOpacity style={this.props.button ? Styles.view : Styles.view1} onPress={() => {
            this.props.redirect(item)
          }}>
            <View style={[
              item.logo ? Styles.imageView : Styles.default, {
                height: '60%'
              }
            ]}>
              {
                item.logo ? <Image
                  source={{ uri: Config.BACKEND_URL + item.logo }}
                  style={Styles.image} /> :
                <View style={{
                  height: '100%',
                  width: '100%',
                  backgroundColor: Color.white,
                  borderRadius: 5
                }}>
                </View>
              }
            </View>
            <View style={{
              padding: 5,
              width: '100%'
            }}>
              <Text style={Styles.address}>{item.name}</Text>
              <Text style={Styles.address}>{item.date}</Text>
            </View>
            <View style={Styles.bottomView}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                size={15}
                style={{
                  color: theme ? theme.secondary : Color.secondary
                }}
              />
              <Text
                numberOfLines={1}
                style={Styles.address}>{item.address}</Text>
            </View>
            {this.props.button && <Button
              style={{
                width: '55%',
                height: 30,
                backgroundColor: this.props.buttonColor
              }}
              content={
                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <Text style={{
                    color: 'white',
                    fontSize: 12,
                    fontFamily: 'Poppins-SemiBold'
                  }}>{this.props.buttonTitle}</Text>
                </View>
              }
              redirect={() => {
                this.props.buttonClick(item)
              }}
            />}
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  versionThree = () => {
    const { theme } = this.props.state;
    return (
      <View style={{
        width: width,
        padding: 10,
        height: height
      }}>
        {this.props.data?.length > 0 && this.props.data.map((item, index) => {
          return (
            <View style={{
              width: width,
              flexDirection: 'row',
              height: 220
            }}>
              <View style={{
                height: 220,
                width: '50%',
                padding: 10
              }}>
                <View style={item.logo ? Styles.imageView : Styles.default}>
                  {
                    item.logo ? <Image
                      source={{ uri: Config.BACKEND_URL + item.logo }}
                      style={Styles.image} />
                      : <FontAwesomeIcon
                        icon={faImage}
                        size={100}
                        style={{
                          color: Color.gray
                        }} />
                  }
                </View>
                {this.props.photos && <View style={{
                  flexDirection: 'row',
                  marginTop: 10
                }}>
                  {item.featured_photos?.length > 0 && item.featured_photos.map((image, index) => {
                    return (
                      <TouchableOpacity
                        style={{
                          height: 40,
                          width: '31%',
                          marginRight: '3%',
                          borderRadius: 5
                        }}
                        onPress={() => this.setImage(Config.BACKEND_URL + image.url)}>
                        <Image
                          source={{ uri: Config.BACKEND_URL + image.url }}
                          style={{
                            height:'100%',
                            width: '100%',
                            borderRadius: 5
                          }}
                        />
                      </TouchableOpacity>
                    )
                  })}
                  {item.featured_photos?.length < 1 &&
                    <View style={Styles.defaultFeatured}>
                      <FontAwesomeIcon
                        icon={faImage}
                        size={25}
                        style={{
                          color: Color.gray
                        }} />
                    </View>
                  }
                  {item.featured_photos?.length < 2 &&
                    <View style={Styles.defaultFeatured}>
                      <FontAwesomeIcon
                        icon={faImage}
                        size={25}
                        style={{
                          color: Color.gray
                        }} />
                    </View>
                  }
                  {item.featured_photos?.length < 3 &&
                    <View style={Styles.defaultFeatured}>
                      <FontAwesomeIcon
                        icon={faImage}
                        size={25}
                        style={{
                          color: Color.gray
                        }} />
                    </View>
                  }
                </View>}
              </View>
              <View style={{
                height: 210,
                width: '50%',
                paddingRight: 10,
                paddingTop: 10,
                paddingBottom: 10
              }}>
                <Text style={{ fontFamily: 'Poppins-SemiBold' }}>{item.name}</Text>
                <View style={[
                  Styles.bottomView, {
                    marginTop: 5,
                    marginBottom: 10
                  }
                ]}>
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    size={15}
                    style={{
                      color: theme ? theme.secondary : Color.secondary
                    }}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 11,
                      width: '85%'
                    }}>{item.address}</Text>
                </View>
                <Button
                  style={{
                    width: '55%',
                    height: 30,
                    backgroundColor: this.props.buttonColor
                  }}
                  content={
                    <View style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                      <Text style={{
                        color: 'white',
                        fontSize: 12,
                        fontFamily: 'Poppins-SemiBold'
                      }}>{this.props.buttonTitle}</Text>
                    </View>
                  }
                  redirect={() => {
                    this.props.buttonClick(item)
                  }}
                />
              </View>
            </View>
          )
        })}
      </View>
    )
  }

  render() {
    const { isImageModal, imageModalUrl } = this.state;
    return (
      <View>
        {this.props.version === 1 && this.versionOne()}
        {this.props.version === 2 && this.versionTwo()}
        {this.props.version === 3 && this.versionThree()}
        <ImageModal
          visible={isImageModal}
          url={imageModalUrl}
          action={() => this.setState({ isImageModal: false })}
        ></ImageModal>
      </View>
    )
  }
}

const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps)(CardsWithImages);