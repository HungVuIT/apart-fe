import React, { useEffect, useState } from 'react';
import classes from './dashboard.module.scss';
import { getDashboard } from '../../../api/service/shop-service';
import Loading from '../../common/loading';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { formatMoney } from '../../../untils/formartMoney';
Chart.register(CategoryScale);
function Dashboard() {
  const [dashboard, setDashboard] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({
    labels: ['Số loại sản phẩm', 'Đã bán'],
    datasets: [
      {
        label: 'Đồng hồ',
        data: [0, 0, 0],
        backgroundColor: [
          'rgba(75,192,192,1)',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0'
        ],
        borderColor: 'black',
        borderWidth: 2
      }
    ]
  });
  useEffect(() => {
    getInforDashboard();
  }, []);
  const getInforDashboard = async () => {
    setLoading(true);
    const res = await getDashboard();
    if (res) {
      setChartData(prev => ({
        ...prev,
        datasets: [
          {
            label: 'Đồng hồ',
            data: [res.watchCount._count, res.soldCount._sum.quantity],
            backgroundColor: [
              'rgba(75,192,192,1)',
              '#50AF95',
              '#f3ba2f',
              '#2a71d0'
            ],
            borderColor: 'black',
            borderWidth: 2
          }
        ]
      }));
      setDashboard(res);
    }
    setLoading(false);
  };
  return (
    <>
      {
        loading
          ? <Loading _type={'ball'} />
          : (dashboard)
              ? <div className={classes.wrapper}>
                  <div className={classes.watch}>
                    <Bar
                      data={chartData}
                      options={{
                        plugins: {
                          title: {
                            display: true,
                            text: 'Thống kê số lượng đồng hồ'
                          },
                          legend: {
                            display: false
                          }
                        }
                      }}
                    />
                  </div>
                  <div className={classes.infor}>
                  <div className={classes.item}>
                      <h1 className={classes.title}>Số đồng hồ trong kho:</h1>
                      <div className={classes.content}>{dashboard.watchCount._sum.quantity}</div>
                    </div>
                    <div className={classes.item}>
                      <h1 className={classes.title}>Số đơn hàng:</h1>
                      <div className={classes.content}>{dashboard.orderCount}</div>
                    </div>
                    <div className={classes.item}>
                      <h1 className={classes.title}>Doanh thu:</h1>
                      <div className={classes.content}>{formatMoney.format(dashboard.revenue._sum.total)}</div>
                    </div>
                  </div>
                </div>
              : <div>Chưa có thống kê</div>
      }
    </>
  );
}

export default Dashboard;
