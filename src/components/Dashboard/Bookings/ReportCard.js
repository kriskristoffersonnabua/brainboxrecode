import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, String, TextField} from '../../reusables';

class ReportCard extends React.Component {
  state = {
    showForm: false,
  };

  toggleForm = () =>
    this.setState({
      showForm: !this.state.showForm,
    });

  render() {
    const {progressReport} = this.props;
    const {showForm} = this.state;
    if (!!progressReport) {
      const {date, subject, time_start, time_end, duration} = progressReport;
      let scheduleDate =
        (!!date && new Date(date).toString().split(' ')) ||
        new Date().toString().split(' ');
      return (
        <View
          style={{
            width: '100%',
            padding: 10,
            borderWidth: 1,
            borderColor: '#2b2b2b',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <String bold text={'Date: '} />
            <String
              italic
              text={`${scheduleDate[1]} ${scheduleDate[2]},${scheduleDate[0]}`}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <String bold text={'Subjects: '} />
            <String italic text={!!subject && subject.toString()} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <String bold text={'Hours: '} />
            <String italic text={!!duration && `${duration} hour/s`} />
          </View>
          <View
            style={{
              alignItems: 'flex-start',
            }}>
            <String bold text={'Remarks:'} />
            <String
              italic
              text={'The tutee got to learn new ways to solve the cow method.'}
            />
          </View>
        </View>
      );
    } else
      return (
        <View
          style={{
            width: '100%',
            padding: 10,
            borderWidth: 1,
            borderColor: '#2b2b2b',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <String bold text={'Date: '} />
              <String italic text={'Some Date'} />
            </View>
            <String bold text={'NO REPORT SUBMITTED'} />
          </View>
          <View
            style={{
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {!showForm ? (
              <TouchableOpacity onPress={this.toggleForm}>
                <String bold text={'TAP TO ADD REPORT'} />
              </TouchableOpacity>
            ) : (
              <View
                style={{width: '100%', padding: 10, alignItems: 'flex-start'}}>
                <TextField placeholder={'Topics Discussed'} />
                <TextField timepicker placeholder={'Time Start'} />
                <TextField timepicker placeholder={'Time End'} />
                <TextField placeholder={'Remarks'} />
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <Button
                    type="warning"
                    text={'Cancel'}
                    width={100}
                    onPress={this.toggleForm}
                  />
                  <Button type="confirm" text={'Submit'} width={100} />
                </View>
              </View>
            )}
          </View>
        </View>
      );
  }
}

export default ReportCard;
