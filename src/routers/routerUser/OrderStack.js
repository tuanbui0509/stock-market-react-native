import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import Modal from "react-native-modal";
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import * as ApiUser from '../../api/Account';
import * as ApiLT from '../../api/LightningTable';
import styleModal from '../../common/styleModal';
import CustomHeader from '../../components/CustomHeader';
import Color from '../../constants/Colors';
import * as Price from '../../constants/Price';
import CustomInputOrder from '../../helpers/CustomInputOrder';
import Formatter from '../../helpers/formatNumber';
import { fetchLightningTable } from '../../store/common/LightningTable';
import { fetchMyStock } from '../../store/users/MyStock';
const pinValidationSchema = yup.object().shape({
  pin: yup
    .string()
    .min(6, ({ min }) => `Mã pin phải đủ ${min} chữ số`)
    .required('Yêu cầu nhập mã Pin'),
})

const formValidationSchema = yup.object().shape({
  soLuong: yup
    .string()
    .min(1, ({ min }) => `Số lượng không được để trống`)
    .required('Yêu cầu nhập Số lượng'),
  gia: yup
    .string()
    .min(1, ({ min }) => 'Giá không được để trống')
    .required('Yêu cầu nhập Giá'),
})
function OrderStack({ navigation, route }) {
  const isFocused = useIsFocused();
  const LightningTable = useSelector(state => state.LightningTable)
  const MyStock = useSelector(state => state.MyStock)
  const dispatch = useDispatch()

  const [stocks, setStocks] = useState(null);
  const [BankAccount, setBankAccount] = useState([])
  const [currentBank, setCurrentBank] = useState()
  const [currentStock, setCurrentStock] = useState(null)
  const [tempStock, setTempStock] = useState({})
  const [order, setOrder] = useState({
    stk: "",
    maCp: "",
    gia: '',
    soLuong: '',
    mkdatLenh: '',
    loaiGiaoDich: true,// Trạng thái mua bán mua: true, bán: false
    loaiLenh: 'LO'// Trạng thái Loai: ATO, ATC, LO
  });
  const fetchBankAccount = async () => {
    const res = await ApiUser.MyBankAccount()
    setBankAccount(res.data)
    setCurrentBank(res.data[0])

  }
  const fetchApiStocks = async () => {
    const res = await ApiLT.LightningTable()
    // setStocks(res.data);
    dispatch(fetchLightningTable(res.data))
    const suggestions = LightningTable.map((item) => ({
      id: item.macp.trim(),
      title: item.macp.trim()
    }))
    setStocks(suggestions)
  }
  const fetchApiMyStock = async () => {
    const res = await ApiUser.MyStocks()
    dispatch(fetchMyStock(res.data.list))
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setOrder({
        ...order,
        stk: BankAccount[0]?.stk,
        maCp: "",
        gia: '',
        soLuong: '',
        mkdatLenh: "",
        loaiGiaoDich: true,// Trạng thái mua bán mua: true, bán: false
        loaiLenh: 'LO'// Trạng thái Loai: ATO, ATC, LO
      })
      setCurrentStock(null)
      fetchBankAccount()
      fetchApiStocks()
      fetchApiMyStock()

    });

    return unsubscribe;
  }, [navigation]);
  const showStatusPicker = BankAccount?.map((item, index) => {
    const value = item.nganHang.tenNganHang + ' - ' + item.stk.trim()
    return (
      <Picker.Item key={index} label={value} value={item.stk.trim()} />
    )
  })
  const mapMyStockToLightningTable = () => {
    // const temp = [...LightningTable]
    const result = LightningTable.filter(o1 => MyStock?.some(o2 => o1.macp.trim() === o2.maCp.trim()));
    const suggestions = result.map((item) => ({
      id: item.macp,
      title: item.macp.trim()
    }))
    setStocks(suggestions)
  }
  const handleSelectItem = (item) => {
    setOrder({ ...order, maCp: item?.id })
    setCurrentStock(item)
    const res = findById(item?.id, LightningTable);
    setTempStock(res)
  }
  const handleChooseBuy = () => {
    setOrder({ ...order, loaiGiaoDich: true })
    fetchApiStocks()
  }
  const handleChooseSell = async () => {
    try {
      setOrder({ ...order, loaiGiaoDich: false })
      setCurrentStock({})
      mapMyStockToLightningTable()
    } catch (error) {
      console.log(error);
    }
  }
  let findIndex = (id, list) => {
    for (let i = 0; i < list.length; i++)
      if (list[i].stk.trim() === id?.trim())
        return i;
    return -1;
  }
  let onChangeListBank = (stk) => {
    setOrder({ ...order, stk: stk })
    let index = findIndex(stk, BankAccount)
    if (index === -1)
      return;
    let res = BankAccount[index];
    setCurrentBank(res)
  }

  const findById = (id, list) => {
    for (let i = 0; i < list.length; i++)
      if (list[i].macp.trim() === id?.trim())
        return list[i];
  }


  const stockInformation = () => {
    return (<View style={{ ...styles.content_wp, borderBottomWidth: 1 }}>
      <View style={styles.box_cp}>
        <Text style={{ fontSize: 24 }}>Giá: {tempStock?.gia / Price.PRICE || null}</Text>
        <Text style={styles.textTitle}>KL: {tempStock?.kl || null}</Text>
      </View>
      <View style={styles.box_cp}>
        <Text style={{ ...styles.textTitle, color: Color.ceil }}>Trần: {(tempStock?.giaTran / Price.PRICE) || null}</Text>
        <Text style={{ ...styles.textTitle, color: Color.floor }}>Sàn: {(tempStock?.giaSan / Price.PRICE) || null}</Text>
        <Text style={{ ...styles.textTitle, color: Color.standard }}>TC: {(tempStock?.giaTC / Price.PRICE) || null}</Text>
      </View>
    </View>)
  }

  const ComponentForm = () =>
    <View style={styleModal.centeredView}>
      <View style={styleModal.modalView}>
        <Text style={{ ...styles.textTitle, fontWeight: 'bold', fontSize: 18, color: '#000' }}>Bạn có muốn đặt lệnh này không?</Text>
        <View style={styles.wrapperLabel}>
          <View style={styles.contentLabel}>
            <Text style={{ ...styles.textTitle, fontSize: 16, marginRight: 20 }}>Tài khoản:</Text>
            <Text style={{ ...styles.textTitle, fontWeight: 'bold', fontSize: 16, color: '#000' }}>{order.stk}</Text>
          </View>
          <View style={styles.contentLabel}>
          </View>
        </View>
        <View style={styles.wrapperLabel}>
          <View style={styles.contentLabel}>
            <Text style={{ ...styles.textTitle, fontSize: 16, marginRight: 20 }}>Mua/Bán:</Text>
            <Text style={{ ...styles.textTitle, fontWeight: 'bold', fontSize: 16, color: order.loaiGiaoDich ? Color.green : Color.red }}>{order.loaiGiaoDich ? 'Mua' : 'Bán'}</Text>
          </View>
          <View style={styles.contentLabel}>
            <Text style={{ ...styles.textTitle, fontSize: 16, marginRight: 20 }}>Mã CK:</Text>
            <Text style={{ ...styles.textTitle, fontWeight: 'bold', fontSize: 16, color: '#000' }}>{order.maCp}</Text>
          </View>
        </View>
        <View style={styles.wrapperLabel}>
          <View style={styles.contentLabel}>
            <Text style={{ ...styles.textTitle, fontSize: 16, marginRight: 20 }}>Số lượng:</Text>
            <Text style={{ ...styles.textTitle, fontWeight: 'bold', fontSize: 16, color: '#000' }}>{order.soLuong}</Text>
          </View>
          <View style={styles.contentLabel}>
            <Text style={{ ...styles.textTitle, fontSize: 16, marginRight: 20 }}>Giá:</Text>
            <Text style={{ ...styles.textTitle, fontWeight: 'bold', fontSize: 16, color: '#000' }}>{order.gia}</Text>
          </View>
        </View>
        <View style={styles.wrapperLabel}>
          <View style={styles.contentLabel}>
            <Text style={{ ...styles.textTitle, fontSize: 16, marginRight: 20 }}>Giá trị:</Text>
            <Text style={{ ...styles.textTitle, fontWeight: 'bold', fontSize: 16, color: '#000' }}>{Formatter(order.gia * order.soLuong)}</Text>
          </View>
          <View style={styles.contentLabel}>
          </View>
        </View>
        <View style={styles.wrapperLabel}>
          <TouchableOpacity onPress={handleConfirm}>
            <LinearGradient
              colors={['#F8495A', Color.red]}
              style={{ ...styles.appButtonContainer, width: 140, marginRight: 20 }}
            >
              <Text style={styles.appButtonText}>Xác nhận</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmitForm}>
            <LinearGradient
              colors={['#fff', '#fff']}
              style={{ ...styles.appButtonContainer, width: 140 }}
            >
              <Text style={{ ...styles.appButtonText, color: '#333' }}>Đóng</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>;


  const ComponentConFirm = () =>
    <View style={styleModal.centeredView}>
      <View style={styleModal.modalView}>
        <Text style={{ ...styles.textTitle, fontWeight: 'bold', fontSize: 18, color: '#000' }}>Nhập mã Pin của bạn?</Text>
        <Formik
          validationSchema={pinValidationSchema}
          initialValues={{ pin: '' }}
          onSubmit={handleFinish}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <>
              <TextInput
                name="pin"
                style={{ ...styles.textInput, width: '80%', marginLeft: 0, marginBottom: 20 }}
                placeholder="Mã Pin của bạn"
                onChangeText={handleChange('pin')}
                onBlur={handleBlur('pin')}
                value={values.pin}
                maxLength={6}
                secureTextEntry
              />
              {errors.pin &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.pin}</Text>
              }

              <View style={styles.wrapperLabel}>
                <TouchableOpacity onPress={handleSubmit}>
                  <LinearGradient
                    colors={['#F8495A', Color.red]}
                    style={{ ...styles.appButtonContainer, width: 140, marginRight: 20 }}
                  >
                    <Text style={styles.appButtonText}>Xác nhận</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setModalConfirmVisible(false), setOrder({ ...order, mkdatLenh: null }) }}>
                  <LinearGradient
                    colors={['#fff', '#fff']}
                    style={{ ...styles.appButtonContainer, width: 140 }}
                  >
                    <Text style={{ ...styles.appButtonText, color: '#333' }}>Hủy bỏ</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>;
  const [isModalFormVisible, setModalFormVisible] = useState(false);
  const [isModalConfirmVisible, setModalConfirmVisible] = useState(false);

  const handleSubmitForm = () => {
    setModalFormVisible(!isModalFormVisible);
  };

  const handleConfirm = () => {
    setModalFormVisible(!isModalFormVisible);
    setModalConfirmVisible(!isModalConfirmVisible);
  };

  const handleFinish = async (values) => {
    setModalConfirmVisible(!isModalConfirmVisible);
    setOrder({ ...order, mkdatLenh: values.pin })
    console.log(order);
  };
  console.log(order);

  return (
    <>
      <CustomHeader title="Đặt lệnh" isHome={true} navigation={navigation} />
      <Formik
        validationSchema={formValidationSchema}
        initialValues={{ soLuong: order.soLuong, gia: order.gia }}
        onSubmit={handleSubmitForm}
      >
        {({ handleSubmit }) => (
          <SafeAreaView style={styles.container}>
            <View>
              <View style={styles.box_stk}>
                <View style={styles.textStyle}>
                  <Picker
                    selectedValue={order.stk}
                    onValueChange={onChangeListBank}>
                    {showStatusPicker}
                  </Picker>
                </View>
              </View>
              <View style={styles.textSelect}>
                <AutocompleteDropdown
                  clearOnFocus={false}
                  closeOnBlur={true}
                  onSelectItem={handleSelectItem}
                  dataSet={stocks}
                  // clearOnFocus={false}
                  textInputProps={{
                    placeholder: "Tìm kiếm mã CK",
                  }}
                />
              </View>
            </View>
            <ScrollView>
              {currentStock ? stockInformation() : null}
              <View style={styles.content_wp}>
                <View style={styles.box}>
                  <Text style={styles.textTitle}>Số dư tài khoản</Text>
                  <Text style={{ ...styles.textTitle, fontWeight: 'bold', color: '#000' }}>{currentBank ? Formatter(currentBank?.soDu) : '0'}</Text>
                </View>
              </View>
              <View style={styles.content_wp}>
                <View style={{ ...styles.box, flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Text style={styles.textTitle}>Khối lượng</Text>
                  <Field
                    component={CustomInputOrder}
                    name="soLuong"
                    placeholder="Số lượng"
                    value={order.soLuong}
                    onValueChange={(value) => setOrder({ ...order, soLuong: value })}
                  />

                </View>
                <View style={{ ...styles.box, flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Text style={styles.textTitle}>Giá đặt</Text>
                  <Field
                    component={CustomInputOrder}
                    name="gia"
                    placeholder="Giá"
                    value={order.gia}
                    onValueChange={(value) => setOrder({ ...order, gia: value })}
                  />
                </View>
              </View>

              <View style={styles.content_wp}>
                <View style={{ ...styles.box, justifyContent: "center" }}>
                  <Text style={styles.textLabel}>LO</Text>
                  <RadioButton
                    value="LO"
                    label="Carto Base MAp"
                    status={order.loaiLenh === 'LO' ? 'checked' : 'unchecked'}
                    onPress={() => { setOrder({ ...order, loaiLenh: 'LO' }); }}
                  />
                </View>
                <View style={{ ...styles.box, justifyContent: "center" }}>
                  <Text style={styles.textLabel}>ATC</Text>
                  <RadioButton
                    value="ATC"
                    status={order.loaiLenh === 'ATC' ? 'checked' : 'unchecked'}
                    onPress={() => { setOrder({ ...order, loaiLenh: 'ATC' }); }}
                  />
                </View>
                <View style={{ ...styles.box, justifyContent: "center" }}>
                  <Text style={styles.textLabel}>ATO</Text>
                  <RadioButton
                    value="ATO"
                    status={order.loaiLenh === 'ATO' ? 'checked' : 'unchecked'}
                    onPress={() => { setOrder({ ...order, loaiLenh: 'ATO' }); }}
                  />
                </View>
              </View>
              <View style={styles.content_wp}>
                <View style={styles.box}>
                  <TouchableOpacity onPress={handleChooseBuy}>
                    {order.loaiGiaoDich ? <LinearGradient
                      colors={['#1BCC77', Color.green]}
                      style={styles.appButtonContainer}
                    >
                      <Text style={styles.appButtonText}>Mua</Text>
                    </LinearGradient> :
                      <LinearGradient
                        colors={['#fff', '#fff']}
                        style={styles.appButtonContainer}
                      >
                        <Text style={{ ...styles.appButtonText, color: '#333' }}>Mua</Text>
                      </LinearGradient>}
                  </TouchableOpacity>
                </View>
                <View style={styles.box}>
                  <TouchableOpacity onPress={handleChooseSell}>
                    {!order.loaiGiaoDich ? <LinearGradient
                      colors={['#F8495A', Color.red]}
                      style={styles.appButtonContainer}
                    >
                      <Text style={styles.appButtonText}>Bán</Text>
                    </LinearGradient> :
                      <LinearGradient
                        colors={['#fff', '#fff']}
                        style={styles.appButtonContainer}
                      >
                        <Text style={{ ...styles.appButtonText, color: '#333' }}>Bán</Text>
                      </LinearGradient>
                    }
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ ...styles.content_wp, justifyContent: 'center', flexDirection: "column" }}>
                {/* <View style={styles.box}> */}
                <TouchableOpacity onPress={handleSubmit}>
                  <LinearGradient
                    colors={[Color.btn_color, Color.bg_color]}
                    style={{ ...styles.appButtonContainer, width: 220 }}
                  >
                    <Text style={styles.appButtonText}>Xác nhận</Text>
                  </LinearGradient>
                </TouchableOpacity>
                {/* </View> */}
              </View>
              <Text style={{ fontSize: 10, textAlign: 'center' }}>Giá x 1000 VNĐ. Bản quyền thuộc về Công ty Cổ phần chứng khoán NTNT. © 2021</Text>
            </ScrollView>
          </SafeAreaView>
        )}
      </Formik>
      <Modal
        isVisible={isModalFormVisible}
        onBackdropPress={() => setModalFormVisible(false)}
        testID={'modal'}
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
      >
        <ComponentForm />
      </Modal>

      <Modal
        isVisible={isModalConfirmVisible}
        // onBackdropPress={() => setModalConfirmVisible(false)}
        testID={'modal'}
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
      >
        <ComponentConFirm />
      </Modal>
    </>
  );
}

export default OrderStack;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 8,
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 40,
    width: '60%',
    marginLeft: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    fontSize: 16
  },
  content_wp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 20,
    marginBottom: 10

  },
  textStyle: {
    paddingVertical: 10,
    height: 40,
    width: '80%',
    marginLeft: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
  box_stk: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  textSelect: {
    marginTop: 5,
    // width: '100%',
    paddingLeft: 30,
    // height: 150
    maxHeight: 150
  },
  box_cp: {
    marginBottom: 5
  },
  textTitle: {
    fontSize: 18,
    marginBottom: 5,
    color: '#888'
  },
  textLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  appButtonContainer: {
    // elevation: 10,
    borderRadius: 8,
    paddingVertical: 8,
    // height: 40,
    paddingHorizontal: 12,
    width: 150,
    borderWidth: 1,
    borderColor: '#d5d5d5',
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  wrapperLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  contentLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    marginBottom: 10
  }
});