import Icon from '../ui/Icon';
import api from '../../services';
import PieChart from '../Charts/PieChart';
import LaunchStats from '../../interfaces/lauchStats';
import { useCallback, useEffect, useState } from 'react';
import { Row, Col, CardBody, CardFooter } from 'reactstrap';
import StackedChartColumn from '../Charts/StackedChartColumn';

import {
  CardStyled,
  TitleContainer,
  HeaderContainer,
  CardHeaderStyled,
  ContainerDataLaunches,
} from './styles';

function Header() {
  const [launches, setLaunches] = useState<LaunchStats>();

  const handleLaunchStats = useCallback(async () => {
    try {
      const { data, status } = await api.get('/launches/stats');
      if (status === 200) setLaunches(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    handleLaunchStats();
  }, []);

  return (
    <HeaderContainer>
      <Row className="mb-3">
        <TitleContainer>
          <Icon name={'rocket'} size={3} />

          <h1>Space X</h1>
        </TitleContainer>
      </Row>

      <Row>
        <Col lg={6} className="mb-3">
          <CardStyled>
            <CardHeaderStyled>
              <strong>Lançamento de foguetes</strong>
            </CardHeaderStyled>

            <CardBody>
              <PieChart data={launches} />
            </CardBody>

            <CardFooter>
              <ContainerDataLaunches>
                <strong>Resultados de lançamento:</strong>

                <div>
                  <strong>Sucesso:</strong>
                  <strong className="success">
                    {launches?.successLaunches}
                  </strong>
                </div>

                <div>
                  <strong>Falha:</strong>
                  <strong className="failure">
                    {launches?.failureLaunches}
                  </strong>
                </div>
              </ContainerDataLaunches>
            </CardFooter>
          </CardStyled>
        </Col>

        <Col lg={6} className="mb-3">
          <CardStyled>
            <CardHeaderStyled>
              <strong>Lançamento por ano</strong>
            </CardHeaderStyled>

            <CardBody>
              <StackedChartColumn data={launches} />
            </CardBody>
          </CardStyled>
        </Col>
      </Row>
    </HeaderContainer>
  );
}

export default Header;
