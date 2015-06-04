(function (angular, _) {

    function SimilarFundsProvider ($q, $http, $resource) {

        var dataset =  {
            isReady: false,
            isValid: true,
            targetRecord: null,
            records: [],
            columns: []
        };

        function parseSimilarMutualFunds (li, i) {
            var mf = li.mutualFund;
            var similarMutualFund = {
                'matchRank' : i + 1, // Ranking should begin with '1'
                'fundName': mf.shareClassBasicInfo.fundName,
                'ticker': mf.shareClassBasicInfo.ticker,
                'primaryIndex': mf.fundBenchmarks.primaryIndexName,
                'fundCategory': mf.shareClassBasicInfo.categoryName,
                'equityStyleBox': mf.portfolioStatistics.equityStylebox,
                'rating': mf.morningStarRating.ratingOverall,
                'return' : mf.morningStarRating.return3YearInt,
                'risk' : mf.morningStarRating.risk3YearInt,
                // TODO: Add custom filters 'unjsonname' for 'r-squared' case
                'rSquared' : mf.mptStatsPrimaryIndex.rsquared3Yr,
                'alpha' : mf.relativeRiskBroadAssetClass.alpha3Yr,
                'beta' : mf.relativeRiskBroadAssetClass.beta3Yr,
                'sharpeRatio' : mf.riskMeasures.sharpeRatio3Yr,
                'sortinoRatio' : mf.riskMeasures.sortinoRatio3Yr,
                'grossExpenseRatio' : mf.prospectusFees.grossExpenseRatio,
                'rank1Yr' : mf.trailingReturnPercAndAbsRanks.rank1Yr,
                'rank5Yr' : mf.trailingReturnPercAndAbsRanks.rank5Yr
            };
            dataset.records.push(similarMutualFund);
        }

        function transformResponseToDataset (response) {
            var data = response;
            console.log('JSON: ', data);

            // TODO: Extract property checks as Karma tests
            if (data.hasOwnProperty('targetMutualFund')) {
                dataset.targetRecord = data.targetMutualFund;
            }
            else {
                dataset.isValid = false;
            }

            if (data.hasOwnProperty('similarMutualFundsList') && data.similarMutualFundsList instanceof Array) {
                _.each(data.similarMutualFundsList, parseSimilarMutualFunds);

                // Use the first object in dataset to set column names
                dataset.columns = Object.keys(dataset.records[0]);
            }
            else {
                dataset.isValid = false;
            }
        }

        function report (httpResponse) {
            console.log('Error: ', httpResponse);
        }

        return {
            get: function () {
                var deferred = $q.defer();
                $http.get('http://localhost:3443/api/similar-funds-results')

                    .error(function (data, status, headers) {
                        console.log('Error: ', data);
                    })

                    .success(function (response) {
                        transformResponseToDataset(response);
                        console.log('Dataset: ', dataset);
                        deferred.resolve(dataset);
                    });

                return deferred.promise;
            }
        };
    }

    angular

        .module('tq-app.common')

        .factory('SimilarFunds', ['$q', '$http', '$resource', SimilarFundsProvider]);

})(angular, _);