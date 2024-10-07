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
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
// Đăng ký các scale
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistics = () => {
    const statistics = useSelector(state => state.statistic.data)
    const location = useLocation();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllStatistics());
    }, [dispatch, location.pathname])

    // Dữ liệu cho biểu đồ
    // Dữ liệu cho biểu đồ
        const chartData = {
            labels: statistics?.map(item => item?.company?.name) || [], // Tên công ty
            datasets: [
                {
                    label: 'Biểu đồ doanh thu tháng này',
                    data: statistics?.map(item => item?.totalAmount) || [], // Tổng tiền phải trả
                    backgroundColor: 'rgba(75, 192, 192, 0.6)', // Thay đổi màu của cột
                },
            ],
        };


    // Các tùy chọn cho biểu đồ
// Các tùy chọn cho biểu đồ
        // Các tùy chọn cho biểu đồ
const options = {
    responsive: true,
    plugins: {
        legend: {
            display: true, // Hiển thị danh sách chú thích
        },
        tooltip: {
            enabled: true, // Hiển thị tooltip khi hover
        },
        // Thay đổi màu nền của biểu đồ
        background: {
            color: 'rgba(255, 255, 255, 1)', // Thay đổi màu nền
        },
    },
    scales: {
        y: {
            beginAtZero: true, // Bắt đầu trục Y từ 0
            title: {
                display: true,
                text: 'Số tiền (VND)', // Tiêu đề cho trục Y
            },
        },
    },
};



    
    // Hàm để xuất PDF
    const exportPDF = () => {
        const inputTable = document.getElementById('admin-post__table');
        const chartCanvas = document.getElementById('chart'); // Giả định bạn đã gán id cho canvas biểu đồ
    
        if (inputTable && chartCanvas) {
            // Thay đổi màu chữ thành đen trước khi chụp
            const originalColor = inputTable.style.color; // Lưu màu chữ ban đầu
            inputTable.style.color = 'black'; // Đặt màu chữ thành đen
    
            // Chụp ảnh bảng
            html2canvas(inputTable, {
                backgroundColor: '#ffffff', // Đặt nền canvas là màu trắng
                scale: 2, // Tăng độ phân giải
                useCORS: true
            }).then((tableCanvas) => {
                const tableImgData = tableCanvas.toDataURL('image/png');
    
                // Tạo PDF mới
                const pdf = new jsPDF({
                    orientation: 'landscape', // Chọn hướng
                    unit: 'px',
                    format: 'a4',
                });
    
                // Kích thước PDF
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
    
                // Tính toán tỷ lệ cho bảng
                const tableWidth = tableCanvas.width;
                const tableHeight = tableCanvas.height;
                const tableRatio = Math.min(pdfWidth / tableWidth, pdfHeight / tableHeight);
                const tableX = (pdfWidth - (tableWidth * tableRatio)) / 2;
                const tableY = 0; // Vị trí Y cho bảng
    
                // Thêm hình ảnh bảng vào PDF
                pdf.addImage(tableImgData, 'PNG', tableX, tableY, tableWidth * tableRatio, tableHeight * tableRatio);
    
                // Thêm trang mới cho biểu đồ
                pdf.addPage();
    
                // Chụp ảnh biểu đồ
                html2canvas(chartCanvas, {
                    backgroundColor: '#ffffff',
                    scale: 2,
                    useCORS: true
                }).then((chartCanvas) => {
                    const chartImgData = chartCanvas.toDataURL('image/png');
    
                    // Tính toán tỷ lệ cho biểu đồ
                    const chartWidth = chartCanvas.width;
                    const chartHeight = chartCanvas.height;
                    const chartRatio = Math.min(pdfWidth / chartWidth, pdfHeight / chartHeight);
                    const chartX = (pdfWidth - (chartWidth * chartRatio)) / 2;
                    const chartY = 0; // Vị trí Y cho biểu đồ
    
                    // Thêm hình ảnh biểu đồ vào PDF
                    pdf.addImage(chartImgData, 'PNG', chartX, chartY, chartWidth * chartRatio, chartHeight * chartRatio);
    
                    // Lưu file PDF
                    pdf.save(`statistics_${new Date().getMonth() + 1}_${new Date().getFullYear()}.pdf`);
    
                    // Đặt lại màu chữ về ban đầu
                    inputTable.style.color = originalColor;
                }).catch(err => {
                    console.error("Error capturing the chart: ", err);
                });
            }).catch(err => {
                console.error("Error capturing the table: ", err);
            });
        } else {
            console.error('Elements not found!');
        }
    };
    
    

    const token = localStorage.getItem('token');
    console.log("Token from localStorage:", token);  // In token ra console
    
    const sendEmail = async (email, totalAmount, companyName, taxCode) => {
        try {
            const token = localStorage.getItem('token'); // Lấy token từ localStorage
            if (!token) {
                alert("Token không tồn tại. Vui lòng đăng nhập lại.");
                return;
            }
    
            // Lấy tháng và năm hiện tại
            const currentMonth = new Date().getMonth() + 1;
            const currentYear = new Date().getFullYear();
            // Định dạng số tiền thành VND
            const formattedAmount = new Intl.NumberFormat('vi-VN', { 
                style: 'currency', 
                currency: 'VND' 
            }).format(totalAmount);
    
            // Mẫu email HTML với bảng và các phần tử đẹp
            const emailBody = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #2d2d2d; text-align: center; margin-bottom: 20px;">Thông Báo Thanh Toán</h2>
                    <p>Kính gửi <strong>${  email}</strong>,</p>
                    <p>Đây là thông báo thanh toán cho tháng <strong>${currentMonth}/${currentYear}</strong>.</p>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <thead>
                            <tr style="background-color: #f5f5f5;">
                                <th style="text-align: left; padding: 10px; border-bottom: 2px solid #ddd;">Mô tả</th>
                                <th style="text-align: right; padding: 10px; border-bottom: 2px solid #ddd;">Giá trị</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">Tên Công Ty</td>
                                <td style="text-align: right; padding: 10px; border-bottom: 1px solid #ddd;">${companyName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">Mã Số Thuế</td>
                                <td style="text-align: right; padding: 10px; border-bottom: 1px solid #ddd;">${taxCode}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">Tổng tiền phải thanh toán</td>
                                <td style="text-align: right; padding: 10px; border-bottom: 1px solid #ddd;">${formattedAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <p style="margin-top: 20px;">Quý khách vui lòng hoàn tất thanh toán trong thời gian sớm nhất.</p>
                    <p style="color: #2d2d2d;">Trân trọng,</p>
                    <p style="color: #2d2d2d;"><strong>Công Ty MANAGEMENTBUILDING.COM</strong></p>
                </div>
                `;

            const response = await fetch('http://localhost:8080/api/email', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Gửi token trong tiêu đề
                },
                // Dữ liệu gửi tới API
                body: JSON.stringify({ 
                    toEmail: email, 
                    subJect: `Thanh toán tháng ${currentMonth}/${currentYear}`, // Tiêu đề chứa tháng hiện tại
                    body: emailBody // Nội dung email HTML
                }),
            });
    
            if (response.ok) {
                alert(`Email đã được gửi đến ${email} với tổng tiền phải trả là ${formattedAmount}`);
            } else {
                const errorText = await response.text(); // Lấy chi tiết lỗi từ phản hồi
                console.error('Response Error:', errorText);
                alert('Đã xảy ra lỗi khi gửi email: ' + errorText); // Hiển thị thông báo lỗi
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Đã xảy ra lỗi khi gửi email: ' + error.message); // Hiển thị thông báo lỗi
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
                        
                        <div className="admin-post__body">
                            <button onClick={exportPDF} className="export-pdf-btn">Xuất PDF</button>
                            {/* Thêm biểu đồ cột */}
                            
                            <table id="admin-post__table" style={{ maxWidth: "1500px" }}>
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th style={{ width: '200px' }}>Tên công ty</th>
                                        <th style={{ width: '250px' }}>Mã số thuế</th>
                                        <th style={{ width: '200px' }}>Email</th>
                                        <th style={{ width: '200px' }}>Tổng diện tích mặt bằng</th>
                                        <th style={{ width: '200px' }}>Tổng tiền phải trả tháng này</th>
                                        <th style={{ width: '105px' }}>Dịch vụ</th>
                                        <th style={{ width: '105px' }}>Mặt bằng thuê</th>
                                        <th style={{ width: '100px' }}>Email</th>
                                    </tr>
                                    {
                                        statistics?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.company?.name}</td>
                                                <td>{item?.company?.taxCode}</td>
                                                <td>{item?.company?.email}</td>
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
                                                <td>
                                                    <button onClick={() => sendEmail(item?.company?.email, item?.totalAmount, item?.company?.name, item?.company?.taxCode)} className="post-edit-item-btn">
                                                        <i className='bx bxs-envelope'></i>
                                                        Gửi
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                                
                                

                            </table>
                            <Bar id="chart" data={chartData} options={options} style={{ height: '400px', width: '100%' }} />

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Statistics;