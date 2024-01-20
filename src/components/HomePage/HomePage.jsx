import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { Card, Row, Col } from 'react-bootstrap';
import SocialIcons from '../SocialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountryData } from './HomePageSlice';
import { filteredDataAction } from './HomePageSlice';
import CustomPagination from '../common/CustomPagination';

const HomePage = () => {
  const { active } = useSelector((state) => state.activeTab)
  const { posts, filteredPost } = useSelector((state) => state.homePageStates)
  const dispatch = useDispatch();

  const [paginationParams, setPaginationParams] = useState({
    totalPages: 0,
    perPage: 10,
    currentPage: 0,
    totalCount: 0,
  });

  useEffect(() => {
    dispatch(fetchCountryData());
  }, []);

  useEffect(() => {
    if (posts) {
      if (active === 'all') {
        dispatch(filteredDataAction(posts))
      } else if (active === 'asia') {
        const filteredByAsia = posts.filter((data) => data.region === 'Asia')
        dispatch(filteredDataAction(filteredByAsia))
      }
      else if (active === 'europe') {
        const filteredByEurope = posts.filter((data) => data.region === 'Europe')
        dispatch(filteredDataAction(filteredByEurope))
      }
    }
  }, [posts, active])

  useEffect(() => {
    handlePageClick(1)
  }, [active]);


  useEffect(() => {
    if (filteredPost?.length) {
      setPaginationParams({
        ...paginationParams,
        totalCount: Number(filteredPost?.length),
        totalPages: Math.ceil(
          Number(filteredPost?.length) / Number(paginationParams?.perPage) || 1
        ),
      });
    }
  }, [filteredPost]);

  const handlePageClick = (page) => {
    setPaginationParams({
      ...paginationParams,
      currentPage: Number(page),
    });
  };

  return (
    <div className='container mt-2'>
      <Header />
      <div className='d-flex flex-column justify-content-between mt-5'>
        <Row>
          {filteredPost
            ?.slice(paginationParams.currentPage * paginationParams.perPage,
              paginationParams.currentPage * paginationParams.perPage + 10)
            ?.map((card, index) => (
              <Col key={index} md={6} className='mb-3'>
                <Card className='border border-dark'>
                  <Row noGutters className='d-flex flex-nowrap'>
                    <Col md={2} className='m-2'>
                      <Card.Img
                        src={card.flag}
                        alt={`Card ${index} image`}
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <Card.Title>{card.name}</Card.Title>
                        <Card.Text>{card.region}</Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
        </Row>

        <CustomPagination
          currentPage={paginationParams?.currentPage}
          totalPages={paginationParams?.totalPages}
          onPageChange={handlePageClick}
        />

        {filteredPost?.length > 0 && (
          <div className='home-footer mt-5'>
            <div className='d-flex justify-content-center'>
              <SocialIcons />
            </div>

            <div className='d-flex justify-content-center'>
              example@gmail.com
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#888888' }}>
              &copy; 2020 Your Name. All Rights Reserved.
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default HomePage
