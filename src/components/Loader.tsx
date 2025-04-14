import { keyframes, styled } from '@mui/material/styles';

const travel = keyframes`
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -100;
  }
`;

const SvgContainer = styled('svg')(({ theme }) => ({
    '--uib-size': '37px',
    '--uib-color': theme.palette.text.primary,
    '--uib-speed': '0.9s',
    '--uib-bg-opacity': '0.1',
    height: 'var(--uib-size)',
    width: 'var(--uib-size)',
    transformOrigin: 'center',
    overflow: 'visible',
}));

const Track = styled('path')(() => ({
    stroke: 'var(--uib-color)',
    opacity: 'var(--uib-bg-opacity)',
    fill: 'none',
    strokeWidth: 5,
    transition: 'stroke 0.5s ease',
}));

const Car = styled('path')(() => ({
    fill: 'none',
    stroke: 'var(--uib-color)',
    strokeWidth: 5,
    strokeDasharray: '15, 85',
    strokeDashoffset: 0,
    strokeLinecap: 'round',
    animation: `${travel} var(--uib-speed) linear infinite`,
    willChange: 'stroke-dasharray, stroke-dashoffset',
    transition: 'stroke 0.5s ease',
}));

export const Loader = () => (
    <SvgContainer viewBox="0 0 37 37" height="37" width="37" preserveAspectRatio="xMidYMid meet">
        <Track
            pathLength={100}
            d="M0.37 18.5 C0.37 5.772 5.772 0.37 18.5 0.37 S36.63 5.772 36.63 18.5 S31.228 36.63 18.5 36.63 S0.37 31.228 0.37 18.5"
        />
        <Car
            pathLength={100}
            d="M0.37 18.5 C0.37 5.772 5.772 0.37 18.5 0.37 S36.63 5.772 36.63 18.5 S31.228 36.63 18.5 36.63 S0.37 31.228 0.37 18.5"
        />
    </SvgContainer>
);
