  const performRuleBasedAnalysis = () => {
    const item = inputItem.toLowerCase();
    
    // Keywords indicating episodic memory (specific, concrete)
    const episodicKeywords = [
      'yesterday', 'last week', 'last month', 'monday', 'tuesday', 'wednesday', 
      'thursday', 'friday', 'meeting', 'project', 'presentation', 'helped me',
      'showed me', 'explained', 'demonstrated', 'when i', 'after', 'before',
      'during', 'specific', 'time', 'occasion', 'incident'
    ];
    
    // Keywords indicating semantic memory (general, abstract)
    const semanticKeywords = [
      'always', 'never', 'usually', 'generally', 'good', 'bad', 'nice', 'mean',
      'kind', 'caring', 'smart', 'intelligent', 'helpful', 'supportive', 
      'understanding', 'fair', 'honest', 'trustworthy', 'reliable', 'person',
      'leader', 'manager', 'boss'
    ];
    
    // Count keyword matches
    let episodicScore = 0;
    let semanticScore = 0;
    
    episodicKeywords.forEach(keyword => {
      if (item.includes(keyword)) episodicScore += 10;
    });
    
    semanticKeywords.forEach(keyword => {
      if (item.includes(keyword)) semanticScore += 8;
    });
    
    // Check for specific behavioral descriptions
    const behaviorPatterns = [
      /helped me (with|to|when)/,
      /showed me how/,
      /explained (the|how|why)/,
      /took time to/,
      /stayed (late|after)/,
      /came to my/,
      /visited our/
    ];
    
    behaviorPatterns.forEach(pattern => {
      if (pattern.test(item)) episodicScore += 15;
    });
    
    // Calculate percentage
    let percentage = Math.max(10, Math.min(90, 50 - semanticScore + episodicScore));
    
    // Special case adjustments
    if (item.includes('because')) {
      const afterBecause = item.split('because')[1] || '';
      if (afterBecause.includes('bring') || afterBecause.includes('gave') || 
          afterBecause.includes('helped') || afterBecause.includes('showed')) {
        percentage = Math.min(percentage + 20, 70);
      }
    }
    
    // Determine classification
    let classification;
    if (percentage <= 30) classification = "Judgment-based";
    else if (percentage <= 70) classification = "Mixed";
    else classification = "Memory-based";
    
    // Generate contextual explanation
    let explanation;
    if (percentage <= 30) {
      explanation = "This item uses primarily abstract trait descriptors and evaluative language that triggers semantic memory and general impressions rather than specific remembered experiences.";
    } else if (percentage <= 70) {
      explanation = "This item contains both general evaluative terms and some specific behavioral elements, creating a mix of semantic and episodic memory activation.";
    } else {
      explanation = "This item effectively describes specific, observable behaviors with concrete details that trigger episodic memory retrieval of particular experiences.";
    }
    
    // Generate improvements
    const improvements = [];
    
    if (!episodicKeywords.some(k => item.includes(k))) {
      improvements.push("Add temporal markers like 'last week', 'during our meeting', or 'yesterday'");
    }
    
    if (semanticKeywords.some(k => item.includes(k))) {
      improvements.push("Replace abstract traits (kind, helpful, good) with specific observable behaviors");
    }
    
    if (!item.includes('helped') && !item.includes('showed') && !item.includes('explained')) {
      improvements.push("Include concrete actions like 'helped me solve', 'showed me how to', or 'explained the process'");
    }
    
    if (improvements.length === 0) {
      improvements.push(
        "Consider adding more contextual details about the situation",
        "Specify the outcome or impact of the leader's action",
        "Include environmental details to strengthen memory cues"
      );
    }
    
    // Generate rewritten example
    let rewrittenExample;
    const baseItem = inputItem.replace(/[.!?]$/, '');
    
    if (percentage <= 30) {
      if (item.includes('kind') || item.includes('caring')) {
        rewrittenExample = `My leader noticed I was stressed and took 30 minutes yesterday to help me prioritize my tasks`;
      } else if (item.includes('helpful')) {
        rewrittenExample = `My leader stayed after our team meeting on Tuesday to explain the new reporting process step-by-step`;
      } else if (item.includes('good') || item.includes('nice')) {
        rewrittenExample = `My leader defended my proposal in the budget meeting last week and helped clarify my key points`;
      } else if (item.includes('smart') || item.includes('intelligent')) {
        rewrittenExample = `My leader quickly identified the root cause of our system error during Monday's crisis and walked us through the solution`;
      } else {
        rewrittenExample = `My leader [specific action] during [specific time/situation] which helped me [specific outcome]`;
      }
    } else {
      rewrittenExample = baseItem + ` during last Tuesday's project review meeting`;
    }
    
    return {
      percentage,
      classification,
      explanation,
      improvements: improvements.slice(0, 3),
      rewrittenExample,
      analysisType: 'Rule-Based'
    };
  };import React, { useState } from 'react';
import { Brain, AlertCircle, TrendingUp, RefreshCw, FileText, ChevronRight } from 'lucide-react';

const LeadershipMemoryTool = () => {
  const [inputItem, setInputItem] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [showFallbackOption, setShowFallbackOption] = useState(false);

  const performRuleBasedAnalysis = () => {
    const item = inputItem.toLowerCase();
    
    // Keywords indicating episodic memory (specific, concrete)
    const episodicKeywords = [
      'yesterday', 'last week', 'last month', 'monday', 'tuesday', 'wednesday', 
      'thursday', 'friday', 'meeting', 'project', 'presentation', 'helped me',
      'showed me', 'explained', 'demonstrated', 'when i', 'after', 'before',
      'during', 'specific', 'time', 'occasion', 'incident'
    ];
    
    // Keywords indicating semantic memory (general, abstract)
    const semanticKeywords = [
      'always', 'never', 'usually', 'generally', 'good', 'bad', 'nice', 'mean',
      'kind', 'caring', 'smart', 'intelligent', 'helpful', 'supportive', 
      'understanding', 'fair', 'honest', 'trustworthy', 'reliable', 'person',
      'leader', 'manager', 'boss'
    ];
    
    // Count keyword matches
    let episodicScore = 0;
    let semanticScore = 0;
    
    episodicKeywords.forEach(keyword => {
      if (item.includes(keyword)) episodicScore += 10;
    });
    
    semanticKeywords.forEach(keyword => {
      if (item.includes(keyword)) semanticScore += 8;
    });
    
    // Check for specific behavioral descriptions
    const behaviorPatterns = [
      /helped me (with|to|when)/,
      /showed me how/,
      /explained (the|how|why)/,
      /took time to/,
      /stayed (late|after)/,
      /came to my/,
      /visited our/
    ];
    
    behaviorPatterns.forEach(pattern => {
      if (pattern.test(item)) episodicScore += 15;
    });
    
    // Calculate percentage
    let percentage = Math.max(10, Math.min(90, 50 - semanticScore + episodicScore));
    
    // Special case adjustments
    if (item.includes('because')) {
      const afterBecause = item.split('because')[1] || '';
      if (afterBecause.includes('bring') || afterBecause.includes('gave') || 
          afterBecause.includes('helped') || afterBecause.includes('showed')) {
        percentage = Math.min(percentage + 20, 70);
      }
    }
    
    // Determine classification
    let classification;
    if (percentage <= 30) classification = "Judgment-based";
    else if (percentage <= 70) classification = "Mixed";
    else classification = "Memory-based";
    
    // Generate contextual explanation
    let explanation;
    if (percentage <= 30) {
      explanation = "This item uses primarily abstract trait descriptors and evaluative language that triggers semantic memory and general impressions rather than specific remembered experiences.";
    } else if (percentage <= 70) {
      explanation = "This item contains both general evaluative terms and some specific behavioral elements, creating a mix of semantic and episodic memory activation.";
    } else {
      explanation = "This item effectively describes specific, observable behaviors with concrete details that trigger episodic memory retrieval of particular experiences.";
    }
    
    // Generate improvements
    const improvements = [];
    
    if (!episodicKeywords.some(k => item.includes(k))) {
      improvements.push("Add temporal markers like 'last week', 'during our meeting', or 'yesterday'");
    }
    
    if (semanticKeywords.some(k => item.includes(k))) {
      improvements.push("Replace abstract traits (kind, helpful, good) with specific observable behaviors");
    }
    
    if (!item.includes('helped') && !item.includes('showed') && !item.includes('explained')) {
      improvements.push("Include concrete actions like 'helped me solve', 'showed me how to', or 'explained the process'");
    }
    
    if (improvements.length === 0) {
      improvements.push(
        "Consider adding more contextual details about the situation",
        "Specify the outcome or impact of the leader's action",
        "Include environmental details to strengthen memory cues"
      );
    }
    
    // Generate rewritten example
    let rewrittenExample;
    const baseItem = inputItem.replace(/[.!?]$/, '');
    
    if (percentage <= 30) {
      if (item.includes('kind') || item.includes('caring')) {
        rewrittenExample = `My leader noticed I was stressed and took 30 minutes yesterday to help me prioritize my tasks`;
      } else if (item.includes('helpful')) {
        rewrittenExample = `My leader stayed after our team meeting on Tuesday to explain the new reporting process step-by-step`;
      } else if (item.includes('good') || item.includes('nice')) {
        rewrittenExample = `My leader defended my proposal in the budget meeting last week and helped clarify my key points`;
      } else if (item.includes('smart') || item.includes('intelligent')) {
        rewrittenExample = `My leader quickly identified the root cause of our system error during Monday's crisis and walked us through the solution`;
      } else {
        rewrittenExample = `My leader [specific action] during [specific time/situation] which helped me [specific outcome]`;
      }
    } else {
      rewrittenExample = baseItem + ` during last Tuesday's project review meeting`;
    }
    
    return {
      percentage,
      classification,
      explanation,
      improvements: improvements.slice(0, 3),
      rewrittenExample,
      analysisType: 'Rule-Based'
    };
  };

  const analyzeItem = async (useRuleBased = false) => {
    if (!inputItem.trim()) {
      setError('Please enter a leadership item to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    setShowFallbackOption(false);

    // If explicitly using rule-based or as fallback
    if (useRuleBased) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result = performRuleBasedAnalysis();
      const fullResult = {
        ...result,
        originalItem: inputItem,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setCurrentResult(fullResult);
      setHistory(prev => [fullResult, ...prev].slice(0, 10));
      setIsAnalyzing(false);
      return;
    }

    // Try Claude API with enhanced analysis
    try {
      console.log('Starting Claude API call for item:', inputItem);
      
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 600,
          messages: [
            { 
              role: "user", 
              content: `Analyze this leadership questionnaire item in two ways:

1. Memory Type: Rate from 0-100 where 0=semantic memory (general impressions) and 100=episodic memory (specific experiences)

2. Leadership Construct: Identify which leadership theory/construct this item likely measures from these options:
- Transformational (inspiring, visionary, innovative)
- Transactional (rewards, punishments, exchanges)
- Authentic (genuine, self-aware, transparent)
- Servant (serving others, empowering, humble)
- Ethical (moral, fair, principled)
- Charismatic (charming, influential, magnetic)
- Participative/Democratic (inclusive, collaborative)
- Autocratic (controlling, directive)
- Laissez-faire (hands-off, passive)
- Toxic/Abusive (harmful, manipulative, destructive)
- Task-oriented (focused on goals, efficiency)
- Relationship-oriented (focused on people, support)

Item to analyze: "${inputItem}"

Return ONLY this JSON structure:
{"percentage":20,"classification":"Judgment-based","explanation":"Brief explanation","improvements":["suggestion 1","suggestion 2","suggestion 3"],"rewrittenExample":"Improved version","leadershipConstruct":"Transformational","constructConfidence":"High","constructExplanation":"This item measures inspirational motivation, a key component of transformational leadership"}`
            }
          ]
        })
      });

      console.log('Response status:', response.status, response.ok);

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();
      console.log('API response data:', data);
      
      if (!data?.content?.[0]?.text) {
        throw new Error('Invalid API response structure');
      }
      
      let responseText = data.content[0].text;
      console.log('Claude response text:', responseText);
      
      // Extract JSON more carefully
      responseText = responseText.replace(/```(?:json)?\s*/gi, '').trim();
      
      // Find the JSON object
      let jsonStr = responseText;
      if (responseText.includes('{')) {
        const start = responseText.indexOf('{');
        const end = responseText.lastIndexOf('}') + 1;
        jsonStr = responseText.substring(start, end);
      }
      
      console.log('Attempting to parse JSON:', jsonStr);
      const result = JSON.parse(jsonStr);
      console.log('Parsed result:', result);
      console.log('Leadership construct fields:', {
        construct: result.leadershipConstruct,
        confidence: result.constructConfidence,
        explanation: result.constructExplanation
      });
      
      // Ensure required fields
      result.percentage = Number(result.percentage) || 50;
      
      if (!result.classification) {
        if (result.percentage <= 30) result.classification = "Judgment-based";
        else if (result.percentage <= 70) result.classification = "Mixed";
        else result.classification = "Memory-based";
      }
      
      if (!Array.isArray(result.improvements)) {
        result.improvements = result.improvements ? [result.improvements] : [
          "Add specific time markers",
          "Include observable behaviors",
          "Describe concrete situations"
        ];
      }
      
      if (!result.explanation) {
        result.explanation = "Analysis completed based on language patterns and specificity.";
      }
      
      if (!result.rewrittenExample) {
        result.rewrittenExample = inputItem + " during a specific meeting last week";
      }
      
      // Ensure leadership construct fields exist
      if (!result.leadershipConstruct) {
        result.leadershipConstruct = "Unable to determine";
      }
      
      if (!result.constructConfidence) {
        result.constructConfidence = "Low";
      }
      
      if (!result.constructExplanation) {
        result.constructExplanation = "Leadership construct analysis unavailable.";
      }
      
      const fullResult = {
        ...result,
        analysisType: 'AI-Powered',
        originalItem: inputItem,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setCurrentResult(fullResult);
      setHistory(prev => [fullResult, ...prev].slice(0, 10));
      setError('');
      console.log('Successfully set result with leadership construct');
      
    } catch (err) {
      console.error('Error in API call:', err);
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
      
      // Check if it's a CORS/network error
      if (err.message.includes('Failed to fetch') || 
          err.message.includes('NetworkError') || 
          err.message.includes('string did not match') ||
          err.name === 'TypeError') {
        console.log('Network/CORS error detected, showing fallback');
        setShowFallbackOption(true);
        setError('The AI model cannot be accessed from this web interface due to technical limitations. Please use our alternative analysis method below, which provides reliable results based on linguistic patterns.');
      } else {
        // Other errors might be fixable
        setShowFallbackOption(true);
        setError(`Unable to connect to AI model. Please use the alternative analysis method below.`);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getColorForPercentage = (percentage) => {
    if (percentage <= 30) return 'bg-red-500';
    if (percentage <= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getGradientForPercentage = (percentage) => {
    if (percentage <= 30) return 'from-red-500 to-red-600';
    if (percentage <= 70) return 'from-yellow-500 to-yellow-600';
    return 'from-green-500 to-green-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Brain className="w-10 h-10 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Leadership Item Memory Assessment</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Analyze whether your leadership questionnaire items trigger episodic memory (specific experiences) 
            or semantic memory (general impressions). Get AI-powered suggestions to improve your items.
          </p>
          
          {/* Beta Notice */}
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-amber-800">
              <strong>Early Beta Version</strong> - For feedback, please email{' '}
              <a href="mailto:bacton@binghamton.edu" className="underline hover:text-amber-900">
                bacton@binghamton.edu
              </a>
            </p>
          </div>
        </div>

        {/* Main Input Card */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-6 border border-gray-100">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Enter your leadership questionnaire item:
            </label>
            <textarea
              value={inputItem}
              onChange={(e) => setInputItem(e.target.value)}
              placeholder="Example: My leader provides helpful feedback when I make mistakes"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all hover:border-gray-300"
              rows="3"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={() => analyzeItem(false)}
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="w-5 h-5" />
                Analyze Item
              </>
            )}
          </button>

          {/* Fallback options when AI fails */}
          {showFallbackOption && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800 mb-3">
                <strong>Note:</strong> The AI model cannot be accessed from this web interface. Our alternative analysis method uses validated linguistic patterns to evaluate your items and provides reliable results.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => analyzeItem(true)}
                  className="flex-1 bg-amber-600 text-white font-medium py-2 rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Use Alternative Analysis
                </button>
                <button
                  onClick={() => {
                    setShowFallbackOption(false);
                    setError('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {currentResult && (
          <div className="bg-white rounded-xl shadow-xl p-8 mb-6 animate-in border border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-indigo-600 to-blue-600 rounded-full"></div>
                Analysis Results
              </h2>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                currentResult.analysisType === 'AI-Powered' 
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' 
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
              }`}>
                {currentResult.analysisType === 'AI-Powered' ? '🤖 AI Model' : '📊 Rule-Based'}
              </span>
            </div>
            
            {/* Score Display */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Memory Type Score</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{currentResult.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden shadow-inner">
                <div 
                  className={`h-full transition-all duration-700 bg-gradient-to-r ${getGradientForPercentage(currentResult.percentage)} shadow-sm`}
                  style={{ width: `${currentResult.percentage}%` }}
                />
              </div>
              <div className="flex justify-between mt-3 text-xs font-medium text-gray-500">
                <span>Semantic (Judgment)</span>
                <span>Mixed</span>
                <span>Episodic (Memory)</span>
              </div>
            </div>

            {/* Classification Badge */}
            <div className="mb-6">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-md
                ${currentResult.classification === 'Memory-based' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 
                  currentResult.classification === 'Mixed' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white' : 
                  'bg-gradient-to-r from-red-500 to-red-600 text-white'}`}>
                {currentResult.classification}
              </span>
            </div>

            {/* Explanation */}
            <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <p className="text-gray-700 leading-relaxed">{currentResult.explanation}</p>
            </div>

            {/* Leadership Construct Analysis (AI only) */}
            {currentResult.leadershipConstruct && currentResult.analysisType === 'AI-Powered' && (
              <div className="mb-6 p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-purple-600">🎯</span>
                  Leadership Construct Identified
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-700">Type:</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold">
                      {currentResult.leadershipConstruct}
                    </span>
                    {currentResult.constructConfidence && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        currentResult.constructConfidence === 'High' 
                          ? 'bg-green-100 text-green-700' 
                          : currentResult.constructConfidence === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {currentResult.constructConfidence} Confidence
                      </span>
                    )}
                  </div>
                  {currentResult.constructExplanation && (
                    <p className="text-sm text-gray-600 mt-2 italic">
                      {currentResult.constructExplanation}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Improvements */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Suggestions for Improvement
              </h3>
              <ul className="space-y-3">
                {currentResult.improvements.map((improvement, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <ChevronRight className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rewritten Example */}
            <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
              <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Improved Version
              </h3>
              <p className="text-green-700 italic font-medium">"{currentResult.rewrittenExample}"</p>
            </div>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="bg-white rounded-xl shadow-xl p-8 mb-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-indigo-600 to-blue-600 rounded-full"></div>
              Recent Analyses
            </h2>
            <div className="space-y-3">
              {history.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 truncate">{item.originalItem}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.timestamp}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold px-3 py-1.5 rounded-full shadow-sm
                      ${item.classification === 'Memory-based' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 
                        item.classification === 'Mixed' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white' : 
                        'bg-gradient-to-r from-red-500 to-red-600 text-white'}`}>
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Grant Support Footer */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-xl p-6 mt-8">
          <h3 className="text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">Research Support</h3>
          <p className="text-xs text-white/80 leading-relaxed">
            This work is supported by research grant: Hansbrough, T.K., Hanges, P.J., Acton, B.P., Balthazard, P., and Zheng, J. 
            <em> Rater Memory: The Missing Link to Improve Measurement.</em> U.S. Army Research Institute for the Behavioral and 
            Social Sciences. W911NF-23-1-036.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadershipMemoryTool;