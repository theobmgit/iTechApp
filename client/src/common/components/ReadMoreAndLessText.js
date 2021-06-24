import React from "react";
import ReadMoreAndLess from 'react-read-more-less';

export class ReadMoreAndLessText extends React.Component {
    render() {
        return (
            <ReadMoreAndLess
                ref={this.ReadMore}
                className="read-more-content"
                charLimit={50}
                readMoreText=" Read more"
                readLessText=" Read less"
             >
                {this.props.data}
            </ReadMoreAndLess>
        );
    }
}