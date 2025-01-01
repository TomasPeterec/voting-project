import staticStyles from './staticStyles';
import MyBackground from '../img/modryPodklad.jpg';

// Define a reusable type for the custom CSS properties
interface CustomStyles {
  topBar: React.CSSProperties;
  headerContainer: React.CSSProperties;
  heroSection: React.CSSProperties;
  heroHeading: React.CSSProperties;
  heroSubheading: React.CSSProperties;
  heroCellBox: React.CSSProperties;
  flexContainer: React.CSSProperties;
  bottombanner: React.CSSProperties;
  underHeader: React.CSSProperties;
  underForm: React.CSSProperties;
}

// Define the expected types for the function's argument
interface VotingFormStylesProps {
  headlineheight: number;
  logoHeight: number;
  HeadlinePadding: number;
  upAndDown: number;
}

// Define the return type for the function
type VotingFormStylesReturnType = typeof staticStyles & CustomStyles;

const votingFormStyles = ({
  headlineheight,
  logoHeight,
  HeadlinePadding,
  upAndDown,
}: VotingFormStylesProps): VotingFormStylesReturnType => {
  // Typing localStyles using the VotingFormStylesReturnType type
  const localStyles: VotingFormStylesReturnType = {
    ...staticStyles,
    topBar: {
      backgroundColor: '#444444',
      backgroundImage: `url(${MyBackground})`,
      borderBottomLeftRadius: logoHeight / 2,
      borderBottomRightRadius: logoHeight / 2,
      flexShrink: 0,
    },
    headerContainer: {
      height: logoHeight / 2,
      textAlign: 'right',
    },
    heroSection: {
      width: '100%',
      paddingLeft: HeadlinePadding,
      paddingRight: HeadlinePadding,
    },
    heroHeading: {
      fontSize: headlineheight,
      color: '#FFA50D',
    },
    heroSubheading: {
      fontSize: headlineheight / 1.272 / 1.272,
      color: '#ffffff',
    },
    heroCellBox: {
      padding: logoHeight * 0.1,
    },
    flexContainer: {
      paddingLeft: HeadlinePadding,
      paddingRight: HeadlinePadding,
      maxWidth: '3000px',
    },
    centralPart: {
      ...staticStyles.centralPart,
      paddingLeft: HeadlinePadding * 0.667,
      paddingRight: HeadlinePadding * 0.667,
    },
    footerCont: {
      ...staticStyles.footerCont,
      paddingLeft: HeadlinePadding * 0.333,
      paddingRight: HeadlinePadding * 0.333,
    },
    underHeader: {
      width: '100%',
      height: upAndDown,
      textAlign: 'right',
      paddingTop: '10px',
      paddingRight: logoHeight / 1.5,
    },
    underForm: {
      width: '100%',
      height: upAndDown,
    },
  };

  return localStyles;
};

export default votingFormStyles;
