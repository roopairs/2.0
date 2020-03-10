import React, { Component } from 'react';
import {document} from 'react-native';

export default class TabSwitcher extends Component {
    constructor(props) {
        super(props);

        const desiredTab = new URLSearchParams(document.location.search).get("tab");
        const defaultTab = props.tabs.includes(desiredTab.toUpperCase()) ? desiredTab.toUpperCase() : props.tabs[0];
        this.activeTab = defaultTab;
    }

    toggleActiveTab = (desiredTab) => {
        const params = new URLSearchParams(document.location.search);
        params.set("tab", desiredTab.toLowerCase());
        history.replaceState({}, "", `${location.pathname}?${params}`);

        this.setState({activeTab: desiredTab});
    }

    renderCardsForTab(tab, objects) {
        console.error("You must implement TabSwitcher.renderCardsForTab().");
    }

    render() {
        const {tabs, tabTitleConverter, filteredTabbedObjects, objectName} = this.props;

        return (
            <div className="card-container" aria-label="Card List">
                <div className="full-width-bar">
                    <ul className={"card-tab-switcher card-tab-switcher--" + objectName.toLowerCase() + "s"} aria-label="Card Tab Switcher">
                        {tabs.map(
                            (tab, index) => (
                                <button key={index} className="btn--aria card-tab-switcher__item-button" onClick={(event) => this.toggleActiveTab(tab)}>
                                    <li className={"card-tab-switcher__item " + objectName.toLowerCase() + "s-" + tab.toLowerCase() + (tab == this.state.activeTab ? " active" : "")}>
                                        {tabTitleConverter(tab)}
                                    </li>
                                </button>
                            )
                        )}
                    </ul>
                </div>
                <div className="card-list" aria-label={this.state.activeTab + " " + objectName + "s"}>
                    {
                        filteredTabbedObjects[this.state.activeTab] === undefined
                    ?
                        <span className="spinner-centered fa-2x" aria-label="Loading..."><i className="fal fa-spinner-third fa-spin--fast" aria-hidden="true"></i></span>
                    :
                        <div className="card-category-container" aria-label="Category Container">
                            {this.renderCardsForTab(this.state.activeTab, filteredTabbedObjects[this.state.activeTab])}
                        </div>
                    }
                </div>
            </div>
        )
    }
}
