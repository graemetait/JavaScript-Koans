var SAMURAIPRINCIPLE = SAMURAIPRINCIPLE || {};
SAMURAIPRINCIPLE.eventDispatcher = function(host) {
    var events = [],
        defaultType = 'default',
        defaultPriority = 0;

    host.addEventListener = function (type, listener, priority) {
        if (!listener) {
            listener = type;
            type = defaultType;
        }
        events.push({
            type: type,
            priority: priority || 0,
            listener: listener
        });
    };

    host.listener = function () {
        return events[0].listener;
    };

    host.dispatchEvent = function (type, argument) {
        if (!argument) {
            argument = type;
            type = defaultType;
        }
        events.filter(function (l) {
            return l.type == type;
        }).sort(function (l1, l2) {
            return l2.priority - l1.priority;
        }).some(function (l) {
            try {
                return l.listener(argument) === false;
            } catch(e) { }
        });
    };

    host.createObservableProperty = function (property) {
        var value;

        host['on' + property + 'Changed'] = function(listener) {
            host.addEventListener(property, listener);
        };
        host['set' + property] = function(newValue) {
            value = newValue;
            this.dispatchEvent(property, value);
        };
        host['get' + property] = function() {
            return value;
        };
    };

    return host;
};