import React, { FC, memo } from 'react';
import preloader from 'assets/icons/preloader.gif';
import styled from '@emotion/styled';

const SPreloader = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: fixed;
  top: 0px;
  left: 0px;
  align-items: center;
  justify-content: center;
`;

const Preloader: FC = () => (
  <SPreloader>
    <img src={preloader} alt="preloader" />
  </SPreloader>
);

export default memo(Preloader);
