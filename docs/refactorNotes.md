### Minor adjustments to application of STYLE-GUIDE recommendations

The style guide recommends the following:

* Name your variables after their purpose, not their structure

    ```javascript
    // good:
    var animals = ['cat', 'dog', 'fish'];

    // bad:
    var array = ['cat', 'dog', 'fish'];

In various instances where we needed to clarify whether a structure was formatted
as JSON or as a POJO (Plain Old JavaScript Object), we have included JSON or
POJO in the name of the variable.
