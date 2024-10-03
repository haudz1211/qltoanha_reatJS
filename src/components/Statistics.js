// import React, { useState, useEffect } from 'react';
import React, {useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
// import { Redirect, useLocation } from 'react-router';
import { useLocation } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';
import { getAllStatistics } from '../redux/actions/statistics';
import { Link } from 'react-router-dom';
import '../css/select_option.css'

const Statistics = () => {
    const statistics = useSelector(state => state.statistic.data)
    const location = useLocation();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllStatistics());
    }, [dispatch, location.pathname])


    // Hàm để xuất PDF
  const exportPDF = () => {
    const input = document.getElementById('admin-post__table');

    if (input) {
        html2canvas(input, {
            backgroundColor: null,
            scale: 2, // Tăng độ phân giải
            useCORS: true // Cho phép lấy hình ảnh từ miền khác
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape', // Chọn hướng
                unit: 'px',
                format: 'a4',
            });

            // Kích thước của hình ảnh
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            // Kích thước của PDF
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Tính toán tỷ lệ
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const width = imgWidth * ratio;
            const height = imgHeight * ratio;

            // Tính toán vị trí để căn giữa hình ảnh
            const x = (pdfWidth - width) / 2; 
            const y = (pdfHeight - height) / 2; 

            pdf.addImage(imgData, 'PNG', x, y, width, height);
            pdf.save(`statistics_${new Date().getMonth() + 1}_${new Date().getFullYear()}.pdf`);
        });
    } else {
        console.error('Element not found!');
    }
};
    
    
    


    return (
        <>
            <div style={{ position: 'relative' }} >
                <div style={{ maxWidth: "1500px", minHeight: "100vh" }} className="admin-post__container">
                    <div className="admin-post__wrapper">
                        <div className="admin-post__head">
                            <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
                                 Tiền phải trả tháng {new Date().getMonth() + 1} năm {new Date().getFullYear()} của các công ty từ đầu tháng tính tới thời điểm hiện tại
                            </div>

                        </div>
                        
                        <div className="admin-post__body" >
                        <button onClick={exportPDF} className="export-pdf-btn">Xuất PDF</button> {/* Thêm nút xuất PDF */}
                            <table id="admin-post__table" style={{ maxWidth: "1500px" }}>
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th style={{ width: '200px' }}>Tên công ty</th>
                                        <th style={{ width: '300px' }}>Lĩnh vực hoạt động</th>
                                        <th style={{ width: '250px' }}>Mã số thuế</th>
                                        <th style={{ width: '200px' }}>Vốn điều lệ</th>
                                        <th style={{ width: '200px' }}>SĐT</th>
                                        <th style={{ width: '200px' }}>Tổng diện tích mặt bằng</th>
                                        <th style={{ width: '200px' }}>Tổng tiền phải trả tháng này</th>
                                        <th style={{ width: '105px' }}>Dịch vụ</th>
                                        <th style={{ width: '105px' }}>Mặt bằng thuê</th>
                                    </tr>
                                    {
                                        statistics?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.company?.name}</td>
                                                <td>{item?.company?.activeField}</td>
                                                <td>{item?.company?.taxCode}</td>
                                                <td>{new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(item?.company?.authorizedCapital)}</td>
                                                <td>{item?.company?.phoneNo}</td>
                                                <td>{item?.company?.sumOfRentedArea}</td>
                                                <td>{new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(item?.totalAmount)}</td>
                                                <td>
                                                    <Link to={{
                                                        pathname: "/service-registration/registered-services",
                                                        search: `?companyId=` + item?.company?.id,
                                                    }}>
                                                        <button className="post-edit-item-btn">
                                                            <i className='bx bxs-pencil'></i>
                                                            Xem
                                                        </button>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link to={{
                                                        pathname: "/monthly-fee-statistics/rented-areas-of-company",
                                                        search: `?companyId=` + item?.company?.id,
                                                    }}>
                                                        <button className="post-edit-item-btn">
                                                            <i className='bx bxs-pencil'></i>
                                                            Xem
                                                        </button>
                                                    </Link>
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
    )
};

export default Statistics;