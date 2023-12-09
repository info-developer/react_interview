import React from 'react';
import { connect } from 'react-redux';
import { Grid, FormControl, Button, TextField } from '@material-ui/core';
import { CommonStyles } from '../../hooks/styles'
import { Supplier, Product } from '../../components/autoComplete';
import { TransactionActions, UIAction } from '../../redux/actions';
import AddIcon from '@material-ui/icons/Add';
import Moment from "moment";
import { extendMoment } from "moment-range";
import SelectBox from '../../components/selectBox';
import { Constants, List } from '../../constants/Constants';
import { getSelectedSupplier, CustomDateFormat } from "../../hooks/functions";
import AdvanceFilters from "../../components/advanceFilters";
import { DesktopDateRangePopup } from '../../components/dateRangePopup';
import ClearIcon from "@material-ui/icons/Clear";
import FilterList from '../../components/filterList';

const moment = extendMoment(Moment as any);

export class FiltersSave {
  supplierId?: string;
  supplierCode?: string;
  product?: any[];
  inventoryType?: any;
}
export interface FiltersSaveType {
  supplierId?: string;
  supplierCode?: string;
  product?: any[];
  dateRange?: any;
}

const SearchBox = (props: any) => {

  const commonClass = CommonStyles();
  let [selectedSupplier, setSelectedSupplier] = React.useState(null as any);
  let [selectedProduct, setSelectedProduct] = React.useState(null as any);
  let [customerFilter, setCustomerFilter] = React.useState('' as any);
  let [providerIdFilter, setProviderIdFilter] = React.useState('' as any);
  const [validationRequired, setValidationRequired] = React.useState<boolean>(false);
  let [componentKey, setComponentKey] = React.useState('1');
  let [filterToSave, setFilterToSave] = React.useState<FiltersSaveType | null>(null);
  let [savedProduct, setSavedProduct] = React.useState(null as any);
  let [savedDateRange, setSavedDateRange] = React.useState(null as any);
  let [savedSupplierCode, setSavedSupplierCode] = React.useState(null as any);
  const isFirstRender = React.useRef(true);
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [selectedDateRange, setSelectedDateRange] = React.useState<any>({ startDate: new Date(moment().subtract(7, 'days').format()), endDate: new Date(moment().format()) })
  const [calendarDateRange, setCalendarDateRange] = React.useState(moment().subtract(7, 'days').format('YYYY-MM-DD') + ' - ' + moment().format('YYYY-MM-DD')); //for visual display
  const [isFilterList, setFilterListStatus] = React.useState(false);
  const [isFilterReset, setFilterReset] = React.useState(false);
  let [checked, setChecked] = React.useState(['']);

  React.useEffect(() => {
    if (props.suppliersList.length > 0) {
      if (isFirstRender.current && !props.selectedSupplier) {
        props.setSelectedSupplier(props.suppliersList[0]);
      }
      isFirstRender.current = false;
    }
  });

  /*React.useEffect(() => {
    handleSearch();
  }, [selectedSupplier, selectedDateRange, selectedProduct]);*/

  const handleSearch = () => {
    const filter = generateFiltersList()
    if (!filter) {
      return
    }

    props.getTransactions(filter)
  }

  const handleReportExport = () => {
    const filter = generateFiltersList(true)
    if (!filter) {
      return
    }

    props.getTransactions(filter)
  }

  const generateFiltersList = (exportReport: boolean = false) => {
    setValidationRequired(true);
    if (!selectedSupplier || !selectedDateRange) {
      setFilterToSave(null);
      return
    }
    setValidationRequired(false);
    filterToSave = new FiltersSave();
    filterToSave.supplierId = (selectedSupplier) ? selectedSupplier.id : undefined;
    filterToSave.supplierCode = (selectedSupplier) ? selectedSupplier.supplierCode : undefined;
    filterToSave.product = (selectedProduct) ? selectedProduct : undefined;
    filterToSave.dateRange = (selectedDateRange) ? selectedDateRange : undefined
    setFilterToSave(filterToSave);

    const startDate = moment.utc(selectedDateRange.startDate).format('YYYY-MM-DD')
    const endDate = moment.utc(selectedDateRange.endDate).format('YYYY-MM-DD')
    const dateRangeString = `${startDate},${endDate}`
    return {
      supplierId: selectedSupplier.supplierCode,
      dates: dateRangeString,
      ...(selectedProduct ? { productGroups: selectedProduct.map((productGroup: any) => productGroup.productGroup).join(',') } : {}),
      ...(customerFilter ? { customer: customerFilter } : {}),
      ...(providerIdFilter ? { provider: providerIdFilter } : {}),
      ...(exportReport ? { export: true } : {})
    }
  }

  const handleResetClick = () => {
    setSelectedSupplier(null);
    setSelectedProduct(null);
    setSavedProduct(null);
    setSelectedDateRange(null);
    setCalendarDateRange('')
    componentKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setComponentKey(componentKey);
    setSavedSupplierCode(null);
    setFilterListStatus(false);
    props.setSelectedSupplier(null);
  }

  const showCalendar = () => {
    setCalendarOpen(true);
  }

  const clearCalendarInput = () => {
    setCalendarOpen(false);
    setCalendarDateRange('');
    setSelectedDateRange(null);
  }

  const onSelectCalendarDates = (dates: any) => {
    setSelectedDateRange(dates);
    const startDateString = dates?.startDate ? moment(dates.startDate).format('YYYY-MM-DD') : '';
    const endDateString = dates?.endDate ? moment(dates.endDate).format('YYYY-MM-DD') : '';
    setCalendarDateRange(startDateString ? (startDateString + ' - ' + endDateString) : '');
  }

  const handleOpenFilter = () => {
    setFilterReset(false);
    setFilterListStatus(!isFilterList);
  }

  const clickAwayOnFilterList = () => {
    setFilterListStatus(false);
  }

  const onFilterChecked = (filterList: any) => {
    setChecked(filterList.checkedList);
    if (filterList.checkedValue === 'PRODUCT') {
      setSelectedProduct(null);
    } else if (filterList.checkedValue === 'CUSTOMER') {
      setCustomerFilter('');
    }
    else if (filterList.checkedValue === 'PROVIDER_ID') {
      setProviderIdFilter('');
    }
  }

  React.useEffect(() => {
    if (props.selectedSupplier) {
      setSelectedSupplier(props.selectedSupplier);
    }
  }, [props.selectedSupplier]);

  return (
    <>
      <div style={{ paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px' }}>
        <Grid container id="main-container">
          <Grid item xs={12}>
            <FormControl className={commonClass.formControl}>
              <Supplier
                supplierCode={savedSupplierCode}
                componentKey={componentKey}
                helperText={'Please choose a supplier to view inventory'}
                error={(!selectedSupplier && validationRequired)}
                style={{ width: 180 }}
                value={selectedSupplier}
                onChangeSupplier={(supplier: any) => {
                  componentKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                  setComponentKey(componentKey);
                  selectedSupplier = (supplier) ? supplier : null;
                  setSelectedSupplier(selectedSupplier);
                  setSelectedProduct(null);
                  setValidationRequired(false);
                }} />
            </FormControl>



            <FormControl className={commonClass.formControl}>
              <TextField
                autoComplete='off'
                id="date_range"
                style={{ width: '200px' }}
                label='Date Range'
                value={selectedDateRange}
                onFocus={showCalendar}
                error={!selectedDateRange}
                helperText={!selectedDateRange ? "Date Range is mandatory" : ""}
                InputProps={{
                  value: calendarDateRange,
                  endAdornment: (
                    (calendarDateRange) && <ClearIcon style={{ cursor: 'pointer' }} onClick={clearCalendarInput} />
                  )
                }}
              />
            </FormControl>

            <FormControl className={commonClass.formControl}>
              <Button onClick={() => handleOpenFilter()} className={commonClass.addMoreButton}><AddIcon />More</Button>
              {isFilterReset === false && <FilterList onClickAway={clickAwayOnFilterList} filterStatus={isFilterList} filterChecked={checked} onFilterChecked={onFilterChecked} filterColumns={List.TransactionFilters} />}
            </FormControl>

            <FormControl className={commonClass.formControl}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                className={commonClass.viewAllBtn}
                style={{ width: 100 }}
                onClick={handleSearch}
              >
                Search
              </Button>
            </FormControl>

            <FormControl className={commonClass.formControl} id={'handle-reset-button'}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                style={{ width: 100 }}
                className={commonClass.viewAllBtn}
                onClick={() => handleResetClick()}
              >
                Reset
              </Button>
            </FormControl>
            <FormControl className={commonClass.rightAlignFormControl} id={'advance-filter-form'}>
              <AdvanceFilters componentKey={componentKey} changeFilter={(value: any) => {
                let savedSearchData: any = (value && value.data) ? JSON.parse(value.data) : null;
                const supplierCode = (savedSearchData && savedSearchData.supplierCode) ? savedSearchData.supplierCode : null;
                const product = (savedSearchData && savedSearchData.product) ? savedSearchData.product : [];
                const dateRange = (savedSearchData && savedSearchData.dateRange) ? savedSearchData.dateRange : null;
                setSavedSupplierCode(supplierCode)
                setSavedProduct(product)
                setSavedDateRange(dateRange)
                setSelectedProduct(product)
                setSelectedDateRange(dateRange)
                setSelectedSupplier(getSelectedSupplier(props.suppliersList, supplierCode))
                props.setSelectedSupplier(getSelectedSupplier(props.suppliersList, supplierCode))
              }} filters={filterToSave} pageName={'ProductExpiry'} />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {(checked.indexOf("PRODUCT") > -1) &&
              <FormControl className={commonClass.formControl}>
                <Product savedProduct={savedProduct} value={selectedProduct} supplier={selectedSupplier} componentKey={componentKey} style={{ width: 180 }} onChangeProduct={(product: any) => {
                  setSelectedProduct(product || null);
                }} />
              </FormControl>
            }

            {(checked.indexOf("CUSTOMER") > -1) &&
              <FormControl className={commonClass.formControl}>
                <TextField
                  helperText={'Enter all or part of a customer name'}
                  autoComplete='off'
                  label={'Customer Name'}
                  onChange={({ target }) => {
                    setCustomerFilter(target.value)
                  }} />
              </FormControl>
            }

            {(checked.indexOf("PROVIDER_ID") > -1) &&
              <FormControl className={commonClass.formControl}>
                <TextField
                  autoComplete='off'
                  label={'Provider Id'}
                  onChange={({ target }) => {
                    setProviderIdFilter(target.value)
                  }} />
              </FormControl>
            }
          </Grid>
          <Grid item xs={12}>
            <FormControl className={commonClass.formControl} style={{ marginBottom: '20px' }}>
              <Button
                className={commonClass.viewAllBtn}
                variant="contained"
                onClick={() => handleReportExport()}
              >
                Export
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <>
        {/* calendar popup used by Date Range picker  */
          calendarOpen &&
          <div style={{ position: 'relative', top: '-60px' }}>
            <DesktopDateRangePopup setOpen={setCalendarOpen} onSelect={onSelectCalendarDates} dates={selectedDateRange} />
          </div>
        }
      </>
    </>
  )
}
const mapStateToProps = (state: any) => (
  {
    isLoading: state.ui.isLoading,
    suppliersList:
      state.supplier.suppliersList && state.supplier.suppliersList.result
        ? state.supplier.suppliersList.result
        : [],
    authUser: (state.user.authUser) ? state.user.authUser : [],
    supplierCode: (state.ui.selectedSupplier && state.ui.selectedSupplier.supplierCode) ? state.ui.selectedSupplier.supplierCode : null,
    selectedSupplier: state.ui.selectedSupplier ? state.ui.selectedSupplier : null,

  }
);

const mapDispatchToProps = (dispatch: any) => ({
  setSelectedSupplier: (data: any) => dispatch(UIAction.setSelectedSupplier(data)),
  getTransactions: (data: any) => dispatch(TransactionActions.getTransactions(data))
});



export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);