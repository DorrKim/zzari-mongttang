import styled from '@emotion/styled';

const Wrapper = styled.div`
  margin: 100px auto;
  width: 994px;
  @media(max-width: 1176px) {
    width: 746px;
  }
  @media(max-width: 768px) {
    width: 648px;
  }
  @media(max-width: 680px) {
    width: 312px;
  }
  @media(max-width: 375px) {
    width: 268px;
  }
`;

export default Wrapper;
