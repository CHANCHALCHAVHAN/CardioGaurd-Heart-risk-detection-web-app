import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
from pathlib import Path

def train_model():
    """Train and save a heart disease prediction model using the UCI dataset."""
    url = "https://archive.ics.uci.edu/ml/machine-learning-databases/heart-disease/processed.cleveland.data"
    column_names = [
        'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach',
        'exang', 'oldpeak', 'slope', 'ca', 'thal', 'target'
    ]
    data = pd.read_csv(url, names=column_names, na_values='?').dropna()
    X = data.drop('target', axis=1)
    y = data['target'].apply(lambda x: 1 if x > 0 else 0)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train_scaled, y_train)

    y_pred = model.predict(X_test_scaled)
    print(f"Model Accuracy: {accuracy_score(y_test, y_pred):.4f}")
    print(classification_report(y_test, y_pred))

    feature_importance = pd.DataFrame({
        'importance': model.feature_importances_
    }, index=X.columns).sort_values('importance', ascending=False)
    print(feature_importance)

    Path('models').mkdir(exist_ok=True)
    joblib.dump(model, 'models/heart_disease_model.pkl')
    joblib.dump(scaler, 'models/scaler.pkl')

    plt.figure(figsize=(10, 6))
    sns.barplot(x='importance', y=feature_importance.index, data=feature_importance)
    plt.title('Feature Importance for Heart Disease Prediction')
    plt.tight_layout()
    plt.savefig('feature_importance.png')

def predict(patient_data):
    """Predict heart disease risk for a given patient."""
    model = joblib.load('models/heart_disease_model.pkl')
    scaler = joblib.load('models/scaler.pkl')

    df = pd.DataFrame([patient_data])
    df_scaled = scaler.transform(df)

    prediction = model.predict(df_scaled)[0]
    prediction_proba = model.predict_proba(df_scaled)[0]
    feature_importance = dict(zip(df.columns, model.feature_importances_))

    return {
        "prediction": int(prediction),
        "prediction_probability": float(prediction_proba[1]),
        "feature_importance": feature_importance
    }

if __name__ == "__main__":
    train_model()

    sample_patient = {
        "age": 65, "sex": 1, "cp": 3, "trestbps": 140, "chol": 260,
        "fbs": 1, "restecg": 0, "thalach": 150, "exang": 1,
        "oldpeak": 2.3, "slope": 0, "ca": 2, "thal": 3
    }

    result = predict(sample_patient)
    print(f"Prediction: {'Heart Disease' if result['prediction'] == 1 else 'No Heart Disease'}")
    print(f"Probability: {result['prediction_probability']:.2f}")
    print("Feature Importance:")
    for feature, importance in sorted(result['feature_importance'].items(), key=lambda x: x[1], reverse=True):
        print(f"  {feature}: {importance:.4f}")