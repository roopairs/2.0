import { Component } from "react";


export default class TabbedContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabbedObjects: {},
            filteredTabbedObjects: {},
        };
    }

    UNSAFE_componentWillMount() {
        const {tabs, tabFilterMap, showFilterInput} = this.props;

        for (let tab of this.filterTabs(tabs)) {
            this._fetchObjects(tab, tabFilterMap.get(tab));
        }
    }

    _fetchObjects = async (tab, tabFilterKwargs) => {
        const response = await fetch(this.getListEndpoint(tab) + tabFilterKwargs);
        const json = await response.json();

        this.setState((state, props) => {
            let updatedState = state;
            updatedState.tabbedObjects[tab] = json;
            updatedState.filteredTabbedObjects[tab] = json;
            return updatedState;
        });
    }

    filterTabs = (tabs) => {
        return tabs;
    }

    getListEndpoint = (tab) => {
        console.log("You must implement TabbedContainer.getListEndpoint()")
    }

    renderFilterInput = () => {
        console.error("You must implement TabbedContainer.renderFilterInput().")
    }

    renderTabSwitcher = () => {
        console.error("You must implement TabbedContainer.renderTabSwitcher().")
    }

    render() {
        const {tabs, tabFilterMap, showFilterInput} = this.props;

        return (
            <div className="tabbed-container">
                {showFilterInput && (
                    <div className="full-width-bar">
                        {this.renderFilterInput()}
                    </div>
                )}
                {this.renderTabSwitcher()}
            </div>
        )
    }
}
