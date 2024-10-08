import React, { useState, useEffect } from 'react';
import '../css/company.css';
import '../css/form.css';
import '../css/dialog.css';
import '../css/login.css';
import '../css/loading.css';
import '../css/search_bar.css';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getALLServicesToAdd, registerServiceForCompany, getAllRegisterdServices, getServicesForRegistrationByName } from '../redux/actions/registed_service';
import moment from 'moment';
import { getCompanyById } from '../redux/actions/company';
import { Navigate } from 'react-router-dom'; // Thay Redirect bằng Navigate

function ServiceRegistration_Services() {
    const data = useSelector(state => state.registeredService.allServices);
    const registerdServices = useSelector(state => state.registeredService.data);
    const [isShow, setIsShow] = useState(false);
    const [serviceToRegister, setServiceToRegister] = useState(null);
    const dispatch = useDispatch();
    const search = useLocation().search;
    const companyId = new URLSearchParams(search).get('companyId');
    const company = useSelector(state => state.company.company);
    const [startDate, setStartDate] = useState(null);
    const [description, setDescription] = useState("");
    const [doneRegistration, setDoneRegistration] = useState(false);
    const [iconLoad, setIconLoad] = useState(false);
    const [serviceName, setServiceName] = useState("");

    useEffect(() => {
        dispatch(getALLServicesToAdd());
        dispatch(getAllRegisterdServices(companyId));
        dispatch(getCompanyById(companyId));
    }, [dispatch, companyId]);

    const popUpEditForm = (item) => {
        setServiceToRegister(item);
        setStartDate(moment(item.startDate, 'DD-MM-YYYY', true).format("YYYY-MM-DD"));
        setDescription(item.description);
        setIsShow(true);
        document.querySelector('.form-post').classList.add('active');
    };

    const cancelClick = () => {
        setIsShow(false);
        setStartDate(null);
        setDescription("");
    };

    const onStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const registerService = (item) => {
        if (item) {
            const serviceRegistration = {
                startDate: moment(startDate).format("DD-MM-YYYY"),
                description: description,
                service: item
            };
            dispatch(registerServiceForCompany(companyId, item.id, serviceRegistration));
            setIconLoad(true);
            setTimeout(() => { setDoneRegistration(true); }, 500);
        }
    };

    const searchBarChange = (e) => {
        setServiceName(e.target.value);
    };

    const searchClick = (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của form
        dispatch(getServicesForRegistrationByName(serviceName));
    };

    return (
        doneRegistration ?
            <Navigate to={`/service-registration/registered-services?companyId=${companyId}`} />
            :
            <>
                <div style={{ position: 'relative' }}>
                    <div className="loading-content" style={{ display: iconLoad ? "block" : "none" }}>
                        <div className="loader"></div>
                    </div>
                    <div style={{ display: isShow ? 'block' : 'none' }} className="modal">
                        <div className="modal_overlay"></div>
                        <div className="form-post">
                            <div className="form-post__title dialog__title">
                                Đăng ký dịch vụ
                            </div>
                            <div className="form-post__content">
                                <div className="form-post__wrapper">
                                    <div className="form-post__field">
                                        <p style={{ textAlign: "left" }}><strong>Tên công ty:</strong> {company?.name}</p>
                                    </div>
                                    <div className="form-post__field">
                                        <p style={{ textAlign: "left" }}><strong>Tên dịch vụ:</strong> {serviceToRegister?.name}</p>
                                    </div>
                                    <div className="form-post__field">
                                        <p style={{ textAlign: "left" }}><strong>Giá dịch vụ:</strong> {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(serviceToRegister?.price)}</p>
                                    </div>
                                    <div className="form-post__field">
                                        <p style={{ textAlign: "left" }}><strong>Ngày bắt đầu:</strong></p>
                                        <input value={startDate} onChange={onStartDateChange} style={{ width: '100%' }} type="date" id='start-date' placeholder="Ngày bắt đầu" />
                                    </div>
                                    <div className="form-post__field">
                                        <p style={{ textAlign: "left" }}><strong>Mô tả:</strong></p>
                                        <input value={description} onChange={onDescriptionChange} style={{ width: '100%' }} type="text" id='description' placeholder="Mô tả" />
                                    </div>
                                </div>
                                <div className="form-post__control">
                                    <button onClick={cancelClick} className="cancel-btn">
                                        Hủy
                                    </button>
                                    <button className="add-section-btn" onClick={() => registerService(serviceToRegister)}>
                                        <i className='bx bx-save'></i>
                                        Đăng ký
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
                        <div className="admin-post__wrapper">
                            <div className="admin-post__head">
                                <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                                    Đăng ký thêm dịch vụ cho công ty: <span style={{ color: "red", fontSize: "30px" }}>{company?.name}</span>
                                    <br />
                                </div>
                                <form onSubmit={searchClick} className="search-bar" style={{ marginRight: "-45px" }}>
                                    <input onChange={searchBarChange} type="search" name="search" pattern=".*\S.*" required />
                                    <button className="search-btn" type="submit">
                                        <span>Search</span>
                                    </button>
                                </form>
                            </div>
                            <div className="admin-post__body">
                                <table id="admin-post__table">
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th style={{ width: '200px' }}>Dịch vụ</th>
                                            <th style={{ width: '200px' }}>Giá tiền cơ bản 1 tháng</th>
                                            <th style={{ width: '200px' }}>Loại dịch vụ</th>
                                            <th style={{ width: '200px' }}>Đăng ký</th>
                                        </tr>
                                        {
                                            data?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.name}</td>
                                                    <td>{new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    }).format(item?.price)}</td>
                                                    <td>{item?.type}</td>
                                                    <td>
                                                        {registerdServices.map(x => x.service.id).includes(item.id) ?
                                                            <button className="post-disabled-btn" style={{ width: "150px" }}>
                                                                <i className='bx bxs-pencil'></i>
                                                                Đã Đăng Ký
                                                            </button>
                                                            :
                                                            <button onClick={() => popUpEditForm(item)} className="post-edit-item-btn" style={{ width: "150px" }}>
                                                                <i className='bx bxs-pencil'></i>
                                                                Đăng ký
                                                            </button>
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    );
}

export default ServiceRegistration_Services;
