import React from 'react';

import './styles.scss';

class TabFilter extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      currentTab: 0,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initialTab !== this.props.initialTab) {
      this.changeTab()
    }
  }

  componentDidMount() {
    this.changeTab()
  }

  changeTab() {
    const { initialTab, tabNames } = this.props;
    const tabIndex = tabNames.findIndex(x => x === initialTab);
    tabIndex !== -1 && this.setState({ currentTab: tabIndex})
  }

  calculateRadius() {
    const { currentTab } = this.state;
    const { tabNames } = this.props;
    if (currentTab === 0) {
      return '4px 0px 0px 4px'
    } else if (currentTab + 1 === tabNames.length) {
      return '0px 4px 4px 0px'
    } else {
      return '0px'
    }
  }

  render() {
    const { tabNames, fullWidth } = this.props;
    const { currentTab } = this.state;
    const borderRadius = this.calculateRadius();
    return (
      <div className="relative margin-v--md tab-filter-container" style={{ display: fullWidth ? 'block' : 'inline-block'}}>
        <div className="tab-filter"
              style={{ width: fullWidth ? '100%' : 'auto', gridTemplateColumns: `repeat(${tabNames.length}, 1fr)`}}
              ref={div => this.div = div}
              >
            {tabNames.map((x, index) => {
              return (<div
                key={`tab-filter-${index}`}
                onClick={() => {
                  this.setState({ currentTab: index});
                  this.props.handleSelect(x, index);
                }}
                className={`tab-filter__tab ${currentTab === index ? 'tab-filter__tab--active' : ''}`}
              >
                <div className="tab-filter__tab-text">
                  <span>{x}</span>
                </div>
              </div>)
            })}
        </div>
        <div
          style={{  borderRadius: borderRadius,
                    height: this.div && this.div.clientHeight,
                    width: `calc(100% / ${tabNames.length})`,
                    left: `calc(100% / ${tabNames.length} * ${currentTab})`}

          }
          className="tab-filter__background" />
      </div>
    )
  }
}

export default TabFilter
